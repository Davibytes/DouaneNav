import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from "react-native";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import styles from "../styles/styles.js";


export default function DeclarationDetailsScreen({
    route,
    navigation
}) {

    const declaration =
        route?.params?.declaration || {};



    return (

        <SafeScreen>

            <View
                style={{
                    flex:1
                }}
            >

                <ScrollView
                    contentContainerStyle={
                        styles.dashboardContainer
                    }
                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        Declaration Details
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        Cargo verification information
                    </Text>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Declaration Number
                        </Text>

                        <Text style={styles.sectionText}>
                            {
                                declaration.declarationNumber
                                ||
                                "N/A"
                            }
                        </Text>

                    </View>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Importer Information
                        </Text>


                        <Text style={styles.sectionText}>
                            Name:
                            {" "}
                            {
                                declaration.importer?.name
                                ||
                                "N/A"
                            }
                        </Text>


                        <Text style={styles.sectionText}>
                            Country:
                            {" "}
                            {
                                declaration.importer?.country
                                ||
                                "N/A"
                            }
                        </Text>

                    </View>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Cargo Information
                        </Text>


                        <Text style={styles.sectionText}>
                            Goods:
                            {" "}
                            {
                                declaration.goods?.description
                                ||
                                "N/A"
                            }
                        </Text>


                        <Text style={styles.sectionText}>
                            Category:
                            {" "}
                            {
                                declaration.goods?.category
                                ||
                                "N/A"
                            }
                        </Text>


                        <Text style={styles.sectionText}>
                            Quantity:
                            {" "}
                            {
                                declaration.goods?.quantity
                                ||
                                "N/A"
                            }
                        </Text>

                    </View>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Transport Information
                        </Text>


                        <Text style={styles.sectionText}>
                            Truck:
                            {" "}
                            {
                                declaration.transport?.truckPlate
                                ||
                                "N/A"
                            }
                        </Text>


                        <Text style={styles.sectionText}>
                            Driver:
                            {" "}
                            {
                                declaration.transport?.driver
                                ||
                                "N/A"
                            }
                        </Text>

                    </View>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Destination
                        </Text>


                        <Text style={styles.sectionText}>
                            Location:
                            {" "}
                            {
                                declaration.destination?.area
                                ||
                                "N/A"
                            }
                            ,
                            {" "}
                            {
                                declaration.destination?.city
                                ||
                                "N/A"
                            }
                        </Text>


                        <Text style={styles.sectionText}>
                            Address:
                            {" "}
                            {
                                declaration.destination?.address
                                ||
                                "N/A"
                            }
                        </Text>



                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }

                            onPress={()=>{

                                navigation.navigate(
                                    "DestinationMap",
                                    {
                                        declaration
                                    }
                                );

                            }}

                        >

                            <Text style={styles.menuButtonText}>
                                View Destination Map
                            </Text>

                        </TouchableOpacity>

                    </View>



                    <View style={styles.section}>

                        <Text style={styles.sectionTitle}>
                            Current Status
                        </Text>


                        <Text style={styles.sectionText}>
                            {
                                declaration.status
                                ||
                                "Unknown"
                            }
                        </Text>

                    </View>




                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }

                        onPress={()=>{

                            navigation.navigate(
                                "AIAnalysis",
                                {
                                    declaration
                                }
                            );

                        }}

                    >

                        <Text style={styles.menuButtonText}>
                            Run AI Analysis
                        </Text>

                    </TouchableOpacity>




                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }

                        onPress={()=>{

                            navigation.navigate(
                                "Inspection",
                                {
                                    declaration
                                }
                            );

                        }}

                    >

                        <Text style={styles.menuButtonText}>
                            Start Inspection
                        </Text>

                    </TouchableOpacity>


                </ScrollView>



                <BottomNavigation

                    navigation={navigation}

                    active="Declarations"

                />


            </View>


        </SafeScreen>

    );

}