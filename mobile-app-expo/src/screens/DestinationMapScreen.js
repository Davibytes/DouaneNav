import {
    View,
    Text
} from "react-native";

import MapView, {
    Marker
} from "react-native-maps";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import styles from "../styles/styles.js";


export default function DestinationMapScreen({
    route,
    navigation
}) {

    const declaration =
        route?.params?.declaration;


    const destination =
        declaration?.destination || {};


    const latitude =
        destination?.coordinates?.latitude
        ||
        destination?.latitude
        ||
        3.8792;


    const longitude =
        destination?.coordinates?.longitude
        ||
        destination?.longitude
        ||
        11.5119;



    return (

        <SafeScreen>

            <View
                style={{
                    flex:1
                }}
            >

                <View
                    style={{
                        padding:20
                    }}
                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        Destination Map
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {
                            destination?.area
                            ||
                            "Unknown area"
                        }
                        ,
                        {" "}
                        {
                            destination?.city
                            ||
                            "Unknown city"
                        }
                    </Text>


                    {
                        declaration && (

                            <Text
                                style={
                                    styles.sectionText
                                }
                            >
                                Declaration:
                                {" "}
                                {
                                    declaration.declarationNumber
                                }
                            </Text>

                        )
                    }

                </View>



                <MapView

                    style={{
                        flex:1
                    }}


                    initialRegion={{

                        latitude,

                        longitude,

                        latitudeDelta:0.05,

                        longitudeDelta:0.05

                    }}

                >

                    <Marker

                        coordinate={{

                            latitude,

                            longitude

                        }}


                        title={
                            declaration?.declarationNumber
                            ||
                            "Cargo Destination"
                        }


                        description={
                            destination?.address
                            ||
                            "Declared destination"
                        }

                    />


                </MapView>



                <BottomNavigation

                    navigation={navigation}

                    active="Map"

                />

            </View>

        </SafeScreen>

    );

}