import {
    useState
} from "react";


import {
    View,
    Text,
    ActivityIndicator
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


export default function DestinationMapScreen({
    route,
    navigation
}) {

    const {
        t
    } = useLanguage();


    const [
        mapLoading,
        setMapLoading
    ] = useState(true);


    const declaration =
        route?.params?.declaration || {};


    const destination =
        declaration?.destination || {};


    const destinationLatitude =
        Number(
            destination?.coordinates?.latitude
        )
        ||
        Number(
            destination?.latitude
        )
        ||
        3.8792;


    const destinationLongitude =
        Number(
            destination?.coordinates?.longitude
        )
        ||
        Number(
            destination?.longitude
        )
        ||
        11.5119;


    const markerTitle =
        declaration?.declarationNumber
        ||
        t.cargoDestination;


    const markerDescription =
        destination?.address
        ||
        t.declaredDestination;


    const mapHtml = `

        <!doctype html>

        <html lang="en">

        <head>

            <meta
                charset="utf-8"
            />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
            />

            <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIINfQ2pN3rWKzfD9UrrxeFkoQMtC4hZ9DM="
                crossorigin=""
            />

            <style>

                html,
                body,
                #map {

                    height: 100%;

                    width: 100%;

                    margin: 0;

                    padding: 0;

                }

            </style>

        </head>


        <body>

            <div
                id="map"
            ></div>


            <script
                src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossorigin=""
            ></script>


            <script>

                const latitude =
                    ${JSON.stringify(
                        destinationLatitude
                    )};


                const longitude =
                    ${JSON.stringify(
                        destinationLongitude
                    )};


                const title =
                    ${JSON.stringify(
                        markerTitle
                    )};


                const description =
                    ${JSON.stringify(
                        markerDescription
                    )};


                const map =
                    L.map("map").setView(
                        [
                            latitude,
                            longitude
                        ],
                        13
                    );


                L.tileLayer(
                    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        maxZoom: 19,

                        attribution:
                            '&copy; OpenStreetMap contributors'
                    }
                ).addTo(map);


                L.marker([
                    latitude,
                    longitude
                ])
                .addTo(map)
                .bindPopup(
                    "<strong>"
                    +
                    title
                    +
                    "</strong><br>"
                    +
                    description
                )
                .openPopup();


                setTimeout(() => {

                    map.invalidateSize();

                }, 300);

            </script>

        </body>

        </html>

    `;


    return (

        <SafeScreen>

            <View
                style={{
                    flex: 1
                }}
            >

                <View
                    style={{
                        padding: 20
                    }}
                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        {
                            t.destinationVerification
                        }
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {
                            t.destinationVerificationSubtitle
                        }
                    </Text>


                    <View
                        style={
                            styles.section
                        }
                    >

                        <Text
                            style={
                                styles.sectionTitle
                            }
                        >
                            {
                                t.destinationInformation
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.declaration}:{" "}
                            {
                                declaration?.declarationNumber
                                ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.city}:{" "}
                            {
                                destination?.city
                                ||
                                t.unknown
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.address}:{" "}
                            {
                                destination?.address
                                ||
                                t.notAvailable
                            }
                        </Text>

                    </View>

                </View>


                {
                    mapLoading && (

                        <ActivityIndicator

                            size="large"

                            color={
                                colors.green
                            }

                            style={{
                                position:
                                    "absolute",

                                top:
                                    "50%",

                                left:
                                    "50%",

                                marginLeft:
                                    -18,

                                marginTop:
                                    -18,

                                zIndex:
                                    10

                            }}

                        />

                    )
                }


                <WebView

                    style={{
                        flex: 1
                    }}

                    originWhitelist={[
                        "*"
                    ]}

                    source={{
                        html:
                            mapHtml
                    }}

                    javaScriptEnabled={
                        true
                    }

                    domStorageEnabled={
                        true
                    }

                    mixedContentMode="never"

                    setSupportMultipleWindows={
                        false
                    }

                    onLoadStart={() =>
                        setMapLoading(
                            true
                        )
                    }

                    onLoadEnd={() =>
                        setMapLoading(
                            false
                        )
                    }

                    onError={
                        event => {

                            console.log(
                                "Map WebView error:",
                                event.nativeEvent
                            );

                            setMapLoading(
                                false
                            );

                        }
                    }

                    onHttpError={
                        event => {

                            console.log(
                                "Map WebView HTTP error:",
                                event.nativeEvent
                            );

                            setMapLoading(
                                false
                            );

                        }
                    }

                />


                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="DestinationMap"

                />

            </View>

        </SafeScreen>

    );

}