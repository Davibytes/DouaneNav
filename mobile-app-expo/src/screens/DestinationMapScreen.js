import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from "react-native";

import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";
import { useLanguage } from "../context/LanguageContext.js";
import { useDeclarationWorkflow } from "../context/DeclarationWorkflowContext.js";
import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


const coordinates = (destination) => ({
    latitude:Number(
        destination?.coordinates?.latitude
        ?? destination?.latitude
    ),
    longitude:Number(
        destination?.coordinates?.longitude
        ?? destination?.longitude
    )
});


export default function DestinationMapScreen({ route, navigation }) {

    const { t } = useLanguage();
    const { declaration:workflowDeclaration } = useDeclarationWorkflow();
    const declaration = route?.params?.declaration || workflowDeclaration;
    const destination = declaration?.destination || {};
    const destinationCoordinates = coordinates(destination);
    const hasDestination = Number.isFinite(destinationCoordinates.latitude)
        && Number.isFinite(destinationCoordinates.longitude);
    const [officerLocation, setOfficerLocation] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [routeUnavailable, setRouteUnavailable] = useState(false);
    const [mapLoading, setMapLoading] = useState(true);
    const [mapError, setMapError] = useState(false);

    useEffect(() => {

        let active = true;

        const getCurrentLocation = async () => {
            try {
                const permission =
                    await Location.requestForegroundPermissionsAsync();

                if (!permission.granted) {
                    return;
                }

                const position =
                    await Location.getCurrentPositionAsync({
                        accuracy:Location.Accuracy.Balanced
                    });

                if (active) {
                    setOfficerLocation({
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    });
                }
            } catch (error) {
                console.log("Location unavailable:", error.message);
            }
        };

        getCurrentLocation();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {

        let active = true;

        const loadRoute = async () => {
            if (!officerLocation || !hasDestination) {
                return;
            }

            try {
                setRouteUnavailable(false);
                const response = await fetch(
                    "https://router.project-osrm.org/route/v1/driving/"
                    + `${officerLocation.longitude},${officerLocation.latitude};`
                    + `${destinationCoordinates.longitude},${destinationCoordinates.latitude}`
                    + "?overview=full&geometries=geojson"
                );

                if (!response.ok) {
                    throw new Error("Routing service unavailable");
                }

                const data = await response.json();
                const line = data.routes?.[0]?.geometry?.coordinates || [];

                if (active && line.length > 0) {
                    setRouteCoordinates(
                        line.map(([longitude, latitude]) => ({
                            latitude,
                            longitude
                        }))
                    );
                }
                else if (active) {
                    setRouteUnavailable(true);
                }
            } catch (error) {
                console.log("Route unavailable:", error.message);
                if (active) {
                    setRouteUnavailable(true);
                }
            }
        };

        loadRoute();

        return () => {
            active = false;
        };
    }, [
        hasDestination,
        officerLocation,
        destinationCoordinates.latitude,
        destinationCoordinates.longitude
    ]);

    const mapHtml = useMemo(() => {

        const mapData = JSON.stringify({
            destination:hasDestination
                ? destinationCoordinates
                : null,
            officer:officerLocation,
            route:routeCoordinates,
            title:declaration?.declarationNumber || t.cargoDestination,
            description:[
                destination.city,
                destination.area,
                destination.address
            ].filter(Boolean).join(", ") || t.declaredDestination,
            noDestination:t.mapUnavailable
        }).replace(/</g, "\\u003c");

        return `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"><style>html,body,#map{height:100%;margin:0}#message{padding:24px;font-family:sans-serif}</style></head><body><div id="map"></div><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script><script>try{const data=${mapData};if(!data.destination){document.getElementById('map').outerHTML='<div id="message">'+data.noDestination+'</div>';}else{const map=L.map('map');const bounds=[];L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);const destination=L.circleMarker([data.destination.latitude,data.destination.longitude],{radius:10,color:'#bd1e1e',fillColor:'#e53935',fillOpacity:1}).addTo(map).bindPopup('<strong>'+data.title+'</strong><br>'+data.description).openPopup();bounds.push(destination.getLatLng());if(data.officer){const officer=L.circleMarker([data.officer.latitude,data.officer.longitude],{radius:9,color:'#0d47a1',fillColor:'#2196f3',fillOpacity:1}).addTo(map).bindPopup('Current officer location');bounds.push(officer.getLatLng());}if(data.route.length){L.polyline(data.route.map(p=>[p.latitude,p.longitude]),{color:'#1565c0',weight:4,opacity:.8}).addTo(map);}if(bounds.length===1){map.setView(bounds[0],14);}else{map.fitBounds(bounds,{padding:[36,36]});}setTimeout(()=>map.invalidateSize(),250);}}catch(error){document.getElementById('map').outerHTML='<div id="message">Map unavailable</div>';}window.ReactNativeWebView&&window.ReactNativeWebView.postMessage('ready');</script></body></html>`;
    }, [
        declaration?.declarationNumber,
        destination.address,
        destination.area,
        destination.city,
        destinationCoordinates,
        hasDestination,
        officerLocation,
        routeCoordinates,
        t.cargoDestination,
        t.declaredDestination,
        t.mapUnavailable
    ]);

    return (
        <SafeScreen>
            <View style={mapStyles.screen}>
                <View style={mapStyles.details}>
                    <Text style={styles.dashboardGreeting}>{t.destinationVerification}</Text>
                    <Text style={styles.dashboardRole}>{t.destinationVerificationSubtitle}</Text>
                    <Text style={styles.sectionText}>{t.declaration}: {declaration?.declarationNumber || t.notAvailable}</Text>
                    <Text style={styles.sectionText}>{t.city}: {destination.city || t.unknown}</Text>
                    <Text style={styles.sectionText}>{t.address}: {destination.address || t.notAvailable}</Text>
                    {routeUnavailable && <Text style={mapStyles.routeStatus}>{t.routeUnavailable}</Text>}
                </View>
                <View style={mapStyles.mapContainer}>
                    {mapError ? <Text style={mapStyles.errorText}>{t.mapUnavailable}</Text> : <WebView style={mapStyles.webView} originWhitelist={["*"]} source={{ html:mapHtml }} javaScriptEnabled domStorageEnabled setSupportMultipleWindows={false} onLoadStart={() => setMapLoading(true)} onMessage={() => setMapLoading(false)} onError={() => { setMapLoading(false); setMapError(true); }} />}
                    {mapLoading && !mapError && <View style={mapStyles.loader}><ActivityIndicator size="large" color={colors.green} /></View>}
                </View>
                <BottomNavigation navigation={navigation} active="DestinationMap" />
            </View>
        </SafeScreen>
    );
}


const mapStyles = StyleSheet.create({
    screen:{ flex:1 }, details:{ padding:20, paddingBottom:8 }, mapContainer:{ flex:1, backgroundColor:colors.surface }, webView:{ flex:1 }, loader:{ ...StyleSheet.absoluteFillObject, alignItems:"center", justifyContent:"center", backgroundColor:"rgba(255,255,255,0.65)" }, errorText:{ margin:24, color:colors.muted, textAlign:"center" }, routeStatus:{ color:colors.muted, marginTop:6 }
});
