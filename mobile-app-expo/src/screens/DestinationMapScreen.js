import {
    useEffect,
    useRef,
    useState
} from "react";


import {
    View,
    Text,
    ActivityIndicator
} from "react-native";


import MapView, {
    Marker,
    Polyline
} from "react-native-maps";


import * as Location from "expo-location";


import {
    useLanguage
} from "../context/LanguageContext.js";


import {
    translations
} from "../i18n/index.js";


import SafeScreen from "../components/SafeScreen.js";

import BottomNavigation from "../components/BottomNavigation.js";


import styles from "../styles/styles.js";

import colors from "../styles/colors.js";


export default function DestinationMapScreen({
    route,
    navigation
}) {


    const mapRef =
        useRef(null);


    const {
        language
    } = useLanguage();


    const t =
        translations[language];


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


    const [
        officerLocation,
        setOfficerLocation
    ] = useState(null);


    const [
        loadingLocation,
        setLoadingLocation
    ] = useState(true);


    useEffect(() => {

        getCurrentLocation();

    }, []);


    const getCurrentLocation =
        async () => {

            try {

                const permission =
                    await Location
                        .requestForegroundPermissionsAsync();


                if (
                    permission.status !==
                    "granted"
                ) {

                    setLoadingLocation(
                        false
                    );

                    return;

                }


                const location =
                    await Location
                        .getCurrentPositionAsync({

                            accuracy:
                                Location.Accuracy.High

                        });


                const current = {

                    latitude:
                        Number(
                            location.coords.latitude
                        ),

                    longitude:
                        Number(
                            location.coords.longitude
                        )

                };


                setOfficerLocation(
                    current
                );


                setTimeout(() => {

                    if (
                        mapRef.current
                    ) {

                        try {

                            mapRef.current
                                .fitToCoordinates(

                                    [

                                        current,

                                        {

                                            latitude:
                                                destinationLatitude,

                                            longitude:
                                                destinationLongitude

                                        }

                                    ],

                                    {

                                        edgePadding: {

                                            top: 120,

                                            right: 80,

                                            bottom: 120,

                                            left: 80

                                        },

                                        animated:
                                            true

                                    }

                                );

                        }
                        catch (error) {

                            console.log(
                                "Map fit error:",
                                error.message
                            );

                        }

                    }

                }, 500);

            }
            catch (error) {

                console.log(
                    "Location error:",
                    error.message
                );

            }
            finally {

                setLoadingLocation(
                    false
                );

            }

        };


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
                        {t.destinationVerification}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.destinationVerificationSubtitle}
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
                            {t.destinationInformation}
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
                    loadingLocation &&

                    <ActivityIndicator
                        size="large"
                        color={
                            colors.green
                        }
                    />

                }


                <MapView

                    ref={
                        mapRef
                    }

                    style={{
                        flex: 1
                    }}

                    initialRegion={{

                        latitude:
                            destinationLatitude,

                        longitude:
                            destinationLongitude,

                        latitudeDelta:
                            0.05,

                        longitudeDelta:
                            0.05

                    }}

                    showsUserLocation={
                        true
                    }

                    showsMyLocationButton={
                        true
                    }

                >

                    {
                        officerLocation &&

                        <Marker

                            coordinate={
                                officerLocation
                            }

                            title="Officer Location"

                        />

                    }


                    <Marker

                        coordinate={{

                            latitude:
                                destinationLatitude,

                            longitude:
                                destinationLongitude

                        }}

                        title={

                            declaration?.declarationNumber

                            ||

                            t.cargoDestination

                        }

                        description={

                            destination?.address

                            ||

                            t.declaredDestination

                        }

                    />


                    {

                        officerLocation &&

                        <Polyline

                            coordinates={[

                                officerLocation,

                                {

                                    latitude:
                                        destinationLatitude,

                                    longitude:
                                        destinationLongitude

                                }

                            ]}

                            strokeWidth={
                                4
                            }

                        />

                    }


                </MapView>


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