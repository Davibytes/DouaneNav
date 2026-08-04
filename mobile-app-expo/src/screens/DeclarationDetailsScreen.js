import {
    ScrollView,
    Text,
    View,
    TouchableOpacity
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import {
    translations
} from "../i18n/index.js";


import styles from "../styles/styles.js";



export default function DeclarationDetailsScreen({
    route,
    navigation
}) {


    const {
        language
    } = useLanguage();


    const t =
        translations[language];



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
                        {t.declarationDetails}
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.cargoVerificationInformation}
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
                            {t.declarationInformation}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.declarationNumber}:{" "}
                            {
                                declaration.declarationNumber ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.status}:{" "}
                            {
                                declaration.status ||
                                t.pendingVerification
                            }
                        </Text>


                    </View>









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
                            {t.importerInformation}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.company}:{" "}
                            {
                                declaration.importer?.name ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.country}:{" "}
                            {
                                declaration.importer?.country ||
                                t.notAvailable
                            }
                        </Text>


                    </View>









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
                            {t.cargoInformation}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.description}:{" "}
                            {
                                declaration.goods?.description ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.category}:{" "}
                            {
                                declaration.goods?.category ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.quantity}:{" "}
                            {
                                declaration.goods?.quantity ||
                                t.notAvailable
                            }
                        </Text>


                    </View>









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
                            {t.transportInformation}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.truckPlate}:{" "}
                            {
                                declaration.transport?.truckPlate ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.driver}:{" "}
                            {
                                declaration.transport?.driver ||
                                t.notAvailable
                            }
                        </Text>


                    </View>









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
                            {t.destinationVerification}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.destination}:{" "}
                            {
                                declaration.destination?.area ||
                                t.notAvailable
                            }
                            ,
                            {" "}
                            {
                                declaration.destination?.city ||
                                t.notAvailable
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.address}:{" "}
                            {
                                declaration.destination?.address ||
                                t.notAvailable
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

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.verifyDestinationMap}
                            </Text>


                        </TouchableOpacity>


                    </View>












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
                            {t.customsStatus}
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.inspectionStatus}:{" "}
                            {
                                declaration.inspectionStatus ||
                                t.awaitingInspection
                            }
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {t.riskLevel}:{" "}
                            {
                                declaration.riskLevel ||
                                t.notAssessed
                            }
                        </Text>


                    </View>












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
                            {t.officerActions}
                        </Text>



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

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.runAIAnalysis}
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

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >
                                {t.startInspection}
                            </Text>


                        </TouchableOpacity>



                    </View>





                </ScrollView>







                <BottomNavigation

                    navigation={
                        navigation
                    }


                    active="Declarations"

                />



            </View>



        </SafeScreen>

    );

}