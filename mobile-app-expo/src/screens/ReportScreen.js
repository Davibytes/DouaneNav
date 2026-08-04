import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    getReports
} from "../services/reportService.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";



export default function ReportScreen({
    navigation
}) {


    const {
        language
    } = useLanguage();



    const t =
        language === "fr"
        ? require("../i18n/fr.js").default
        : require("../i18n/en.js").default;





    const [
        reports,
        setReports
    ] = useState([]);





    useEffect(()=>{

        loadReports();

    },[]);






    const loadReports = async()=>{


        try{


            const data =
                await getReports();


            setReports(
                data || []
            );


        }

        catch(error){


            console.log(
                "Reports error:",
                error.message
            );



            setReports([

                {

                    declarationNumber:
                    "CMR-2026-001",

                    result:
                    "Approved",

                    officer:
                    "Officer Mbarga",

                    status:
                    "Completed",

                    comments:
                    "Cargo verified successfully",

                    aiAnalysis:
                    "Low risk"

                },

                {

                    declarationNumber:
                    "CMR-2026-002",

                    result:
                    "Pending Review",

                    officer:
                    "Officer Njoya",

                    status:
                    "Pending",

                    comments:
                    "Additional verification required",

                    aiAnalysis:
                    "Medium risk"

                }

            ]);

        }


    };








    return(


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

                        {t.inspectionReports}

                    </Text>






                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >

                        {t.inspectionRecords}

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

                            {t.reportSummary}

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.totalReports}:
                            {" "}
                            {
                                reports.length
                            }

                        </Text>






                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.completed}:
                            {" "}
                            {
                                reports.filter(
                                    r=>r.status==="Completed"
                                ).length
                            }

                        </Text>







                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.pending}:
                            {" "}
                            {
                                reports.filter(
                                    r=>r.status==="Pending"
                                ).length
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

                            {t.exportReports}

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {t.generateReports}

                        </Text>






                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }

                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                {t.exportPDF}

                            </Text>


                        </TouchableOpacity>






                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }

                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                {t.exportExcel}

                            </Text>


                        </TouchableOpacity>






                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }

                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                {t.exportCSV}

                            </Text>


                        </TouchableOpacity>




                    </View>









                    {

                        reports.length === 0 ?


                        <View
                            style={
                                styles.section
                            }
                        >


                            <Text
                                style={
                                    styles.sectionText
                                }
                            >

                                {t.noReportsAvailable}

                            </Text>


                        </View>


                        :



                        reports.map(

                            (item,index)=>(


                                <View

                                    key={index}

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
                                            item.declarationNumber
                                            ||
                                            t.declaration
                                        }


                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.officer}:
                                        {" "}
                                        {
                                            item.officer
                                            ||
                                            "N/A"
                                        }

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.inspectionResult}:
                                        {" "}
                                        {
                                            item.result
                                            ||
                                            "N/A"
                                        }

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.status}:
                                        {" "}
                                        {
                                            item.status
                                            ||
                                            t.unknown
                                        }

                                    </Text>






                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.aiRisk}:
                                        {" "}
                                        {
                                            item.aiAnalysis
                                            ||
                                            t.notAnalysed
                                        }

                                    </Text>







                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        {t.comments}:
                                        {" "}
                                        {
                                            item.comments
                                            ||
                                            t.noComments
                                        }

                                    </Text>





                                </View>


                            )

                        )

                    }







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