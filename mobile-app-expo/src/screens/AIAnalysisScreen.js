import {
    useState
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    runAIAnalysis
} from "../services/aiService.js";


import styles from "../styles/styles.js";



export default function AIAnalysisScreen({
    route,
    navigation
}){


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
                        declaration?.declarationNumber
                        ||
                        "UNKNOWN",


                    documents:[]

                });



            setAnalysis(
                result
            );


        }
        catch(error){


            console.log(
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
                        AI Cargo Analysis
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        AI decision support module
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
                            Declaration
                        </Text>


                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {
                                declaration?.declarationNumber
                                ||
                                "No declaration selected"
                            }
                        </Text>


                    </View>





                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }

                        onPress={
                            startAnalysis
                        }

                    >

                        <Text
                            style={
                                styles.menuButtonText
                            }
                        >

                            {
                                loading
                                ?
                                "Analyzing..."
                                :
                                "Run AI Analysis"
                            }

                        </Text>


                    </TouchableOpacity>





                    {
                        analysis && (

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
                                    Result
                                </Text>



                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    Risk Level:
                                    {" "}
                                    {
                                        analysis.riskLevel
                                    }
                                </Text>



                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    Score:
                                    {" "}
                                    {
                                        analysis.riskScore
                                    }
                                </Text>



                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    {
                                        analysis.analysis
                                    }
                                </Text>



                            </View>

                        )
                    }



                </ScrollView>





                <BottomNavigation

                    navigation={navigation}

                    active="More"

                />


            </View>


        </SafeScreen>

    );

}