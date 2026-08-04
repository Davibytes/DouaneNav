import {
    useState
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    runAIAnalysis
} from "../services/aiService.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";



export default function AIAnalysisScreen({
    route,
    navigation
}) {


    const {
        language
    } = useLanguage();



    const t =
        language === "fr"
        ? require("../i18n/fr.js").default
        : require("../i18n/en.js").default;





    const declaration =
        route?.params?.declaration;



    const [
        analysis,
        setAnalysis
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(false);





    const startAnalysis = async()=>{


        try{


            setLoading(true);



            const result =
                await runAIAnalysis({

                    declarationNumber:
                        declaration?.declarationNumber ||
                        "CMR-2026-001",

                    documents: []

                });



            setAnalysis(result);


        }

        catch(error){


            console.log(
                "AI Analysis Error:",
                error.message
            );


        }

        finally{


            setLoading(false);


        }


    };







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

                        {t.aiAnalysis}

                    </Text>






                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >

                        {t.aiSubtitle}

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

                            {t.declarationNumber}:
                            {" "}
                            {
                                declaration?.declarationNumber ||
                                "CMR-2026-001"
                            }

                        </Text>







                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.analysisType}:
                            {" "}
                            {t.customsRiskAssessment}

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

                            {t.aiModuleStatus}

                        </Text>






                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.mockAIModule}

                        </Text>






                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.aiDescription}

                        </Text>



                    </View>









                    {

                        analysis && (


                            <>


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

                                        {t.cargoRiskScore}

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.riskLevel}:
                                        {" "}
                                        {
                                            analysis.riskLevel ||
                                            t.medium
                                        }

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.riskScore}:
                                        {" "}
                                        {
                                            analysis.riskScore ||
                                            0
                                        }
                                        /100

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

                                        {t.inspectionPriority}

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.recommendedPriority}:
                                        {" "}
                                        {
                                            analysis.priority ||
                                            t.normalInspection
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

                                        {t.riskIndicators}

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        • {t.consistencyCheck}
                                    </Text>



                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        • {t.destinationVerification}
                                    </Text>



                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >
                                        • {t.cargoAnalysis}
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

                                        {t.aiRecommendation}

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {
                                            analysis.analysis ||
                                            t.reviewDeclaration
                                        }

                                    </Text>




                                </View>





                            </>

                        )

                    }









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

                            {t.futureAIDevelopment}

                        </Text>






                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.plannedCapabilities}

                        </Text>






                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            • {t.documentOCR}
                        </Text>




                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            • {t.invoiceVerification}
                        </Text>




                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            • {t.machineLearningRisk}
                        </Text>



                    </View>









                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }


                        onPress={
                            startAnalysis
                        }


                        disabled={
                            loading
                        }

                    >


                        {

                            loading

                            ?

                            <ActivityIndicator
                                color="white"
                            />

                            :

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                {t.runAIAnalysis}

                            </Text>

                        }


                    </TouchableOpacity>





                </ScrollView>







                <BottomNavigation

                    navigation={
                        navigation
                    }


                    active="More"

                />





            </View>



        </SafeScreen>


    );

}