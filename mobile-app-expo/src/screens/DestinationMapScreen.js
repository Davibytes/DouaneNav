import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";
import { useLanguage } from "../context/LanguageContext.js";
import { useDeclarationWorkflow } from "../context/DeclarationWorkflowContext.js";
import styles from "../styles/styles.js";
import colors from "../styles/colors.js";

const OSRM_URL = "https://router.project-osrm.org/route/v1/driving/";
const ARRIVAL_RADIUS_METERS = 45;
const OFF_ROUTE_RADIUS_METERS = 65;
const MIN_ROUTE_REQUEST_INTERVAL_MS = 15000;
const MIN_REROUTE_MOVEMENT_METERS = 25;

const coordinates = (destination) => ({
    latitude: Number(destination?.coordinates?.latitude ?? destination?.latitude),
    longitude: Number(destination?.coordinates?.longitude ?? destination?.longitude)
});

const distanceBetween = (first, second) => {
    if (!first || !second) return Infinity;
    const radians = Math.PI / 180;
    const dLat = (second.latitude - first.latitude) * radians;
    const dLon = (second.longitude - first.longitude) * radians;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(first.latitude * radians)
        * Math.cos(second.latitude * radians) * Math.sin(dLon / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const closestPoint = (position, points) => points.reduce((closest, point, index) => {
    const distance = distanceBetween(position, point);
    return distance < closest.distance ? { distance, index } : closest;
}, { distance: Infinity, index: 0 });

const remainingRouteDistance = (position, points) => {
    const nearest = closestPoint(position, points);
    let total = nearest.distance;
    for (let index = nearest.index; index < points.length - 1; index += 1) {
        total += distanceBetween(points[index], points[index + 1]);
    }
    return total;
};

const formatDistance = (meters) => meters >= 1000
    ? `${(meters / 1000).toFixed(meters >= 10000 ? 0 : 1)} km`
    : `${Math.max(0, Math.round(meters))} m`;

const formatDuration = (seconds) => `${Math.max(1, Math.round(seconds / 60))} min`;

const maneuverText = (maneuver, t) => {
    const modifier = maneuver?.modifier;
    if (maneuver?.type === "roundabout" || maneuver?.type === "rotary") return t.enterRoundabout;
    if (maneuver?.type === "exit roundabout" || maneuver?.type === "exit rotary") return t.exitRoundabout;
    if (maneuver?.type === "uturn" || modifier === "uturn") return t.uTurn;
    if (maneuver?.type === "arrive") return t.destinationReached;
    if (modifier === "left" || modifier === "sharp left" || modifier === "slight left") return maneuver?.type === "continue" ? t.keepLeft : t.turnLeft;
    if (modifier === "right" || modifier === "sharp right" || modifier === "slight right") return maneuver?.type === "continue" ? t.keepRight : t.turnRight;
    return t.continueStraight;
};

export default function DestinationMapScreen({ route, navigation }) {
    const { t } = useLanguage();
    const { declaration: workflowDeclaration } = useDeclarationWorkflow();
    const declaration = route?.params?.declaration || workflowDeclaration;
    const destination = declaration?.destination || {};
    const destinationCoordinates = useMemo(() => coordinates(destination), [
        destination?.coordinates?.latitude,
        destination?.coordinates?.longitude,
        destination?.latitude,
        destination?.longitude
    ]);
    const hasDestination = Number.isFinite(destinationCoordinates.latitude)
        && Number.isFinite(destinationCoordinates.longitude)
        && Math.abs(destinationCoordinates.latitude) <= 90
        && Math.abs(destinationCoordinates.longitude) <= 180;
    const mapRef = useRef(null);
    const watcherRef = useRef(null);
    const navigationActiveRef = useRef(false);
    const routeRequestRef = useRef({ lastAt: 0, origin: null, inFlight: false });
    const routeDataRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [mapLoading, setMapLoading] = useState(true);
    const [mapError, setMapError] = useState(false);
    const [navigationActive, setNavigationActive] = useState(false);
    const [officerLocation, setOfficerLocation] = useState(null);
    const [routeData, setRouteData] = useState(null);
    const [routeStatus, setRouteStatus] = useState(null);
    const [arrivalReached, setArrivalReached] = useState(false);
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [remainingDistance, setRemainingDistance] = useState(null);

    const stopWatcher = useCallback(() => {
        watcherRef.current?.remove();
        watcherRef.current = null;
    }, []);

    const clearNavigation = useCallback(() => {
        navigationActiveRef.current = false;
        stopWatcher();
        setNavigationActive(false);
        setRouteData(null);
        routeDataRef.current = null;
        setRouteStatus(null);
        setArrivalReached(false);
        setActiveStepIndex(0);
        setRemainingDistance(null);
    }, [stopWatcher]);

    const requestRoute = useCallback(async (origin, force = false) => {
        if (!hasDestination || !navigationActiveRef.current || routeRequestRef.current.inFlight) return;
        const now = Date.now();
        const previous = routeRequestRef.current;
        if (!force && (now - previous.lastAt < MIN_ROUTE_REQUEST_INTERVAL_MS || distanceBetween(origin, previous.origin) < MIN_REROUTE_MOVEMENT_METERS)) return;
        routeRequestRef.current = { ...previous, lastAt: now, origin, inFlight: true };
        setRouteStatus(force && routeDataRef.current ? "recalculating" : "loading");
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            const response = await fetch(`${OSRM_URL}${origin.longitude},${origin.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?overview=full&geometries=geojson&steps=true`, { signal: controller.signal });
            if (!response.ok) throw new Error("Routing service unavailable");
            const data = await response.json();
            const routeResult = data.routes?.[0];
            const line = routeResult?.geometry?.coordinates;
            if (!Array.isArray(line) || !line.length || !Array.isArray(routeResult.legs)) throw new Error("Invalid route response");
            const points = line.map(([longitude, latitude]) => ({ latitude, longitude }));
            const steps = routeResult.legs.flatMap((leg) => leg.steps || []).map((step) => ({
                distance: step.distance, duration: step.duration, name: step.name || "", maneuver: step.maneuver || {},
                position: step.maneuver?.location ? { longitude: step.maneuver.location[0], latitude: step.maneuver.location[1] } : null
            })).filter((step) => step.position && step.maneuver.type !== "depart");
            const result = { coordinates: points, distance: routeResult.distance, duration: routeResult.duration, steps, approximate: distanceBetween(points[points.length - 1], destinationCoordinates) > 100 };
            if (navigationActiveRef.current) {
                routeDataRef.current = result;
                setRouteData(result);
                setRouteStatus(result.approximate ? "approximate" : null);
                setActiveStepIndex(0);
                setRemainingDistance(result.distance);
            }
        } catch (error) {
            if (navigationActiveRef.current) setRouteStatus(routeDataRef.current ? "recalculateFailed" : "unavailable");
        } finally {
            clearTimeout(timeout);
            routeRequestRef.current = { ...routeRequestRef.current, inFlight: false };
        }
    }, [destinationCoordinates.latitude, destinationCoordinates.longitude, hasDestination]);

    const handleLocation = useCallback((location) => {
        const nextLocation = { latitude: location.coords.latitude, longitude: location.coords.longitude };
        setOfficerLocation(nextLocation);
        const currentRoute = routeDataRef.current;
        if (!currentRoute) {
            requestRoute(nextLocation);
            return;
        }
        const nearest = closestPoint(nextLocation, currentRoute.coordinates);
        setRemainingDistance(remainingRouteDistance(nextLocation, currentRoute.coordinates));
        const stepIndexes = currentRoute.steps.map((step) => closestPoint(step.position, currentRoute.coordinates).index);
        const nextStep = stepIndexes.findIndex((pointIndex) => pointIndex > nearest.index + 2);
        setActiveStepIndex(nextStep === -1 ? Math.max(0, currentRoute.steps.length - 1) : nextStep);
        if (distanceBetween(nextLocation, destinationCoordinates) <= ARRIVAL_RADIUS_METERS) {
            navigationActiveRef.current = false;
            setNavigationActive(false);
            setArrivalReached(true);
            setRouteStatus("arrived");
            stopWatcher();
            return;
        }
        if (nearest.distance > OFF_ROUTE_RADIUS_METERS) requestRoute(nextLocation, true);
    }, [destinationCoordinates, requestRoute, stopWatcher]);

    const startNavigation = useCallback(async () => {
        if (!hasDestination) return setRouteStatus("noDestination");
        try {
            const permission = await Location.requestForegroundPermissionsAsync();
            if (!permission.granted) return setRouteStatus("permission");
            const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            const current = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            navigationActiveRef.current = true;
            setNavigationActive(true);
            setArrivalReached(false);
            setOfficerLocation(current);
            if (distanceBetween(current, destinationCoordinates) <= ARRIVAL_RADIUS_METERS) {
                navigationActiveRef.current = false;
                setNavigationActive(false);
                setArrivalReached(true);
                setRouteStatus("arrived");
                return;
            }
            routeRequestRef.current = { lastAt: 0, origin: null, inFlight: false };
            await requestRoute(current, true);
            if (navigationActiveRef.current) watcherRef.current = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 5000, distanceInterval: 10 }, handleLocation);
        } catch (error) {
            navigationActiveRef.current = false;
            setNavigationActive(false);
            setRouteStatus("location");
        }
    }, [handleLocation, hasDestination, requestRoute]);

    useEffect(() => () => { navigationActiveRef.current = false; stopWatcher(); }, [stopWatcher]);

    const mapPayload = useMemo(() => ({
        destination: hasDestination ? destinationCoordinates : null, officer: officerLocation, route: routeData?.coordinates || [],
        title: declaration?.declarationNumber || t.cargoDestination,
        description: [destination.city, destination.area, destination.address].filter(Boolean).join(", ") || t.declaredDestination,
        officerLabel: t.currentLocation, noDestination: t.destinationCoordinatesUnavailable
    }), [declaration?.declarationNumber, destination.address, destination.area, destination.city, destinationCoordinates, hasDestination, officerLocation, routeData?.coordinates, t.cargoDestination, t.currentLocation, t.declaredDestination, t.destinationCoordinatesUnavailable]);

    const sendMapUpdate = useCallback(() => { if (mapReady) mapRef.current?.postMessage(JSON.stringify({ type: "update", payload: mapPayload })); }, [mapPayload, mapReady]);
    useEffect(() => { sendMapUpdate(); }, [sendMapUpdate]);

    const initialMapData = useMemo(() => ({
        destination: hasDestination ? destinationCoordinates : null,
        officer: null,
        route: [],
        title: declaration?.declarationNumber || t.cargoDestination,
        description: [destination.city, destination.area, destination.address].filter(Boolean).join(", ") || t.declaredDestination,
        officerLabel: t.currentLocation,
        noDestination: t.destinationCoordinatesUnavailable
    }), [declaration?.declarationNumber, destination.address, destination.area, destination.city, destinationCoordinates, hasDestination, t.cargoDestination, t.currentLocation, t.declaredDestination, t.destinationCoordinatesUnavailable]);

    const mapHtml = useMemo(() => {
        const initialData = JSON.stringify(initialMapData).replace(/</g, "\\u003c");
        return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><style>html,body,#map{height:100%;margin:0}#message{padding:24px;font-family:sans-serif}</style></head><body><div id="map"></div><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>const post=(value)=>window.ReactNativeWebView&&window.ReactNativeWebView.postMessage(value);try{let map,destinationLayer,officerLayer,routeLayer,navigationViewSet=false;const escapeHtml=(value)=>String(value).replace(/[&<>\"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[char]));const update=(data)=>{if(!data.destination){document.getElementById('map').outerHTML='<div id="message">'+escapeHtml(data.noDestination)+'</div>';return;}if(!map){map=L.map('map',{zoomControl:true,touchZoom:true,scrollWheelZoom:true,zoomSnap:0.5}).setView([data.destination.latitude,data.destination.longitude],16);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);}if(destinationLayer)map.removeLayer(destinationLayer);destinationLayer=L.circleMarker([data.destination.latitude,data.destination.longitude],{radius:10,color:'#bd1e1e',fillColor:'#e53935',fillOpacity:1}).addTo(map).bindPopup('<strong>'+escapeHtml(data.title)+'</strong><br>'+escapeHtml(data.description));if(officerLayer)map.removeLayer(officerLayer);if(data.officer){officerLayer=L.circleMarker([data.officer.latitude,data.officer.longitude],{radius:9,color:'#0d47a1',fillColor:'#2196f3',fillOpacity:1}).addTo(map).bindPopup(escapeHtml(data.officerLabel));}if(routeLayer)map.removeLayer(routeLayer);if(data.route&&data.route.length)routeLayer=L.polyline(data.route.map((point)=>[point.latitude,point.longitude]),{color:'#1565c0',weight:5,opacity:.85}).addTo(map);if(data.officer&&!navigationViewSet){const bounds=L.latLngBounds([destinationLayer.getLatLng(),officerLayer.getLatLng()]);if(routeLayer)bounds.extend(routeLayer.getBounds());map.fitBounds(bounds,{padding:[36,36],maxZoom:16});navigationViewSet=true;}setTimeout(()=>map.invalidateSize(),150);};const receive=(event)=>{try{const message=JSON.parse(event.data);if(message.type==='update')update(message.payload);}catch(error){}};window.addEventListener('message',receive);document.addEventListener('message',receive);update(${initialData});post('ready');}catch(error){document.getElementById('map').outerHTML='<div id="message">Map unavailable</div>';post('error');}</script></body></html>`;
    }, [initialMapData]);

    const activeStep = routeData?.steps?.[activeStepIndex];
    const distanceToManeuver = activeStep && officerLocation ? distanceBetween(officerLocation, activeStep.position) : null;
    const statusMessage = routeStatus === "permission" ? t.locationPermissionRequired : routeStatus === "noDestination" ? t.destinationCoordinatesUnavailable : routeStatus === "loading" ? t.calculatingRoute : routeStatus === "recalculating" ? t.recalculatingRoute : routeStatus === "recalculateFailed" ? t.routeRecalculationFailed : routeStatus === "unavailable" ? `${t.networkError} ${t.unableToDetermineRoute}` : routeStatus === "location" ? t.locationUnavailable : routeStatus === "approximate" ? t.exactRouteUnavailable : routeStatus === "arrived" ? t.destinationReached : null;

    return <SafeScreen><View style={mapStyles.screen}>
        <View style={mapStyles.details}><Text style={styles.dashboardGreeting}>{t.destinationVerification}</Text><Text style={styles.dashboardRole}>{t.destinationVerificationSubtitle}</Text><Text style={styles.sectionText}>{t.declaration}: {declaration?.declarationNumber || t.notAvailable}</Text><Text style={styles.sectionText}>{t.city}: {destination.city || t.unknown}</Text><Text style={styles.sectionText}>{t.address}: {destination.address || t.notAvailable}</Text></View>
        <View style={mapStyles.mapContainer}>{mapError ? <Text style={mapStyles.errorText}>{t.mapUnavailable}</Text> : <WebView ref={mapRef} style={mapStyles.webView} originWhitelist={["*"]} source={{ html: mapHtml }} javaScriptEnabled domStorageEnabled setSupportMultipleWindows={false} onLoadStart={() => setMapLoading(true)} onMessage={(event) => { setMapLoading(false); if (event.nativeEvent.data === "ready") setMapReady(true); if (event.nativeEvent.data === "error") setMapError(true); }} onError={() => { setMapLoading(false); setMapError(true); }} />}{mapLoading && !mapError && <View style={mapStyles.loader}><ActivityIndicator size="large" color={colors.green} /></View>}</View>
        <View style={mapStyles.navigationPanel}>{statusMessage && <Text style={[mapStyles.routeStatus, routeStatus === "arrived" && mapStyles.arrivalStatus]}>{statusMessage}</Text>}{navigationActive && routeData && !arrivalReached && <View><Text style={mapStyles.panelLabel}>{t.nextManeuver}</Text><Text style={mapStyles.maneuver}>{maneuverText(activeStep?.maneuver, t)}</Text>{distanceToManeuver !== null && <Text style={mapStyles.panelText}>{formatDistance(distanceToManeuver)}</Text>}{!!activeStep?.name && <Text style={mapStyles.panelText}>{activeStep.name}</Text>}<Text style={mapStyles.summary}>{t.distance}: {formatDistance(remainingDistance ?? routeData.distance)} · {t.estimatedTime}: {formatDuration(routeData.duration * ((remainingDistance ?? routeData.distance) / routeData.distance))}</Text></View>}<TouchableOpacity style={[styles.menuButton, !hasDestination && mapStyles.disabledButton]} disabled={!hasDestination} onPress={navigationActive ? clearNavigation : startNavigation}><Text style={styles.menuButtonText}>{navigationActive ? t.stopNavigation : t.startNavigation}</Text></TouchableOpacity></View>
        <BottomNavigation navigation={navigation} active="DestinationMap" />
    </View></SafeScreen>;
}

const mapStyles = StyleSheet.create({
    screen: { flex: 1 }, details: { padding: 20, paddingBottom: 6 }, mapContainer: { flex: 1, minHeight: 180, backgroundColor: colors.surface }, webView: { flex: 1 }, loader: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.65)" }, errorText: { margin: 24, color: colors.muted, textAlign: "center" }, navigationPanel: { backgroundColor: colors.surface, paddingHorizontal: 20, paddingTop: 12, paddingBottom: 0 }, routeStatus: { color: colors.muted, marginBottom: 8, textAlign: "center" }, arrivalStatus: { color: colors.greenDark, fontWeight: "700" }, panelLabel: { color: colors.greenDark, fontSize: 12, fontWeight: "700", marginBottom: 2 }, maneuver: { color: colors.text, fontSize: 18, fontWeight: "700" }, panelText: { color: colors.text, fontSize: 14, marginTop: 2 }, summary: { color: colors.muted, fontSize: 14, marginTop: 6 }, disabledButton: { opacity: 0.55 }
});
