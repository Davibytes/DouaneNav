import {
    useMemo,
    useState
} from "react";

import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View
} from "react-native";

import {
    WebView
} from "react-native-webview";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";
import {
    useLanguage
} from "../context/LanguageContext.js";
import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


const DEFAULT_DESTINATION = {
    latitude: 3.8792,
    longitude: 11.5119
};


const validCoordinate = (
    value,
    fallback
) => {

    const coordinate = Number(value);

    return Number.isFinite(coordinate)
        ? coordinate
        : fallback;

};


export default function DestinationMapScreen({
    route,
    navigation
}) {

    const {
        t
    } = useLanguage();

    const [mapLoading, setMapLoading] = useState(true);
    const [mapError, setMapError] = useState(false);

    const declaration =
        route?.params?.declaration || {};

    const destination =
        declaration.destination || {};

    const destinationLatitude = validCoordinate(
        destination.coordinates?.latitude
        ?? destination.latitude,
        DEFAULT_DESTINATION.latitude
    );

    const destinationLongitude = validCoordinate(
        destination.coordinates?.longitude
        ?? destination.longitude,
        DEFAULT_DESTINATION.longitude
    );

    const markerDescription =
        destination.address || t.declaredDestination;

    const mapUrl = useMemo(() => {

        const delta = 0.015;
        const bounds = [
            destinationLongitude - delta,
            destinationLatitude - delta,
            destinationLongitude + delta,
            destinationLatitude + delta
        ].join(",");

        return "https://www.openstreetmap.org/export/embed.html"
            + `?bbox=${encodeURIComponent(bounds)}`
            + "&layer=mapnik"
            + `&marker=${encodeURIComponent(
                `${destinationLatitude},${destinationLongitude}`
            )}`;

    }, [
        destinationLatitude,
        destinationLongitude
    ]);


    return (

        <SafeScreen>

            <View style={mapStyles.screen}>

                <View style={mapStyles.details}>

                    <Text style={styles.dashboardGreeting}>
                        {t.destinationVerification}
                    </Text>

                    <Text style={styles.dashboardRole}>
                        {t.destinationVerificationSubtitle}
                    </Text>

                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            {t.destinationInformation}
                        </Text>

                        <Text style={styles.sectionText}>
                            {t.declaration}: {declaration.declarationNumber || t.notAvailable}
                        </Text>

                        <Text style={styles.sectionText}>
                            {t.city}: {destination.city || t.unknown}
                        </Text>

                        <Text style={styles.sectionText}>
                            {t.address}: {markerDescription}
                        </Text>

                    </View>

                </View>

                <View style={mapStyles.mapContainer}>

                    {
                        mapError

                        ?

                        <View style={mapStyles.errorContainer}>
                            <Text style={mapStyles.errorText}>
                                {t.mapUnavailable}
                            </Text>
                        </View>

                        :

                        <WebView
                            style={mapStyles.webView}
                            originWhitelist={["*"]}
                            source={{ uri: mapUrl }}
                            javaScriptEnabled
                            domStorageEnabled
                            setSupportMultipleWindows={false}
                            onLoadStart={() => {
                                setMapError(false);
                                setMapLoading(true);
                            }}
                            onLoadEnd={() =>
                                setMapLoading(false)
                            }
                            onError={event => {
                                console.log(
                                    "Map WebView error:",
                                    event.nativeEvent
                                );
                                setMapLoading(false);
                                setMapError(true);
                            }}
                            onHttpError={event => {
                                console.log(
                                    "Map WebView HTTP error:",
                                    event.nativeEvent
                                );
                                setMapLoading(false);
                                setMapError(true);
                            }}
                        />
                    }

                    {
                        mapLoading && !mapError && (
                            <View style={mapStyles.loader}>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.green}
                                />
                            </View>
                        )
                    }

                </View>

                <BottomNavigation
                    navigation={navigation}
                    active="DestinationMap"
                />

            </View>

        </SafeScreen>

    );

}


const mapStyles = StyleSheet.create({

    screen: {
        flex: 1
    },

    details: {
        padding: 20,
        paddingBottom: 0
    },

    mapContainer: {
        flex: 1,
        marginTop: 4,
        backgroundColor: colors.surface
    },

    webView: {
        flex: 1,
        backgroundColor: colors.surface
    },

    loader: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.65)"
    },

    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.surface
    },

    errorText: {
        color: colors.muted,
        textAlign: "center"
    }

});
