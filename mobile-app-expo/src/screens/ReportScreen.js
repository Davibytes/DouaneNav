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

import styles from "../styles/styles.js";

export default function ReportScreen({
    navigation
}) {


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


            setReports(data);


        }
        catch(error){

            console.log(
                "Reports error:",
                error.message
            );


            setReports([]);

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
                        Inspection Reports
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        Generated cargo verification reports
                    </Text>

                    {
                        reports.length === 0 && (

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
                                    No reports available
                                </Text>

                            </View>

                        )
                    }

                    {
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
                                        }

                                    </Text>



                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        Result:
                                        {" "}
                                        {
                                            item.result
                                        }

                                    </Text>




                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        Comments:
                                        {" "}
                                        {
                                            item.comments
                                        }

                                    </Text>

                                    <Text
                                        style={
                                            styles.sectionText
                                        }
                                    >

                                        AI Analysis:
                                        {" "}
                                        {
                                            item.aiAnalysis
                                        }

                                    </Text>



                                </View>

                            )

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