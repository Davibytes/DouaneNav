import {
    useEffect,
    useState
} from "react";

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from "react-native";

import {
    useFocusEffect
} from "@react-navigation/native";

import {
    useCallback
} from "react";

import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import {
    useAuth
} from "../context/AuthContext.js";

import {
    getDashboard
} from "../services/dashboardService.js";

import styles from "../styles/styles.js";


export default function DashboardScreen({
    navigation
}) {


    const {
        user
    } = useAuth();



    const [
        dashboard,
        setDashboard
    ] = useState(null);




    useFocusEffect(

        useCallback(()=>{

            loadDashboard();

        },[])

    );





    const loadDashboard = async()=>{


        try{


            const data =
                await getDashboard();



            setDashboard(
                data
            );


        }


        catch(error){


            console.log(
                "Dashboard error:",
                error.message
            );



            setDashboard({

                counts:{

                    todayDeclarations:0,

                    pendingInspections:0,

                    completedInspections:0,

                    pendingSynchronizations:0

                },


                alerts:[],

                recentInspections:[],

                destinationStats:[],

                inspectionStatistics:{

                    total:0,

                    completed:0,

                    pending:0

                }

            });


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
                        Good Morning
                    </Text>



                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {
                            user?.name
                            ||
                            "Customs Officer"
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
                            ACTIVE ALERTS
                        </Text>



                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            {
                                dashboard?.alerts?.length

                                ?

                                dashboard.alerts[0].message

                                :

                                "No active alerts."

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
                            TODAY'S OPERATIONS
                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Today's Declarations:
                            {" "}
                            {
                                dashboard?.counts?.todayDeclarations
                                ??
                                0
                            }

                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Pending Inspections:
                            {" "}
                            {
                                dashboard?.counts?.pendingInspections
                                ??
                                0
                            }

                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Completed Inspections:
                            {" "}
                            {
                                dashboard?.counts?.completedInspections
                                ??
                                0
                            }

                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Pending Synchronizations:
                            {" "}
                            {
                                dashboard?.counts?.pendingSynchronizations
                                ??
                                0
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
                            RECENT INSPECTIONS
                        </Text>



                        {
                            dashboard?.recentInspections?.length

                            ?

                            dashboard.recentInspections.map(
                                (item,index)=>(

                                    <View

                                        key={
                                            item._id || index
                                        }

                                        style={
                                            styles.listItem
                                        }

                                    >

                                        <Text
                                            style={
                                                styles.listTitle
                                            }
                                        >
                                            {
                                                item.declarationNumber
                                                ||
                                                "Unknown"
                                            }
                                        </Text>



                                        <Text
                                            style={
                                                styles.listSubtitle
                                            }
                                        >
                                            {
                                                item.status
                                                ||
                                                "Pending"
                                            }
                                        </Text>


                                    </View>

                                )

                            )

                            :

                            <Text
                                style={
                                    styles.sectionText
                                }
                            >
                                No recent inspections.
                            </Text>

                        }



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
                            COMMON DESTINATIONS
                        </Text>




                        {
                            dashboard?.destinationStats?.map(

                                (item,index)=>(

                                    <Text

                                        key={
                                            index
                                        }

                                        style={
                                            styles.operationItem
                                        }

                                    >

                                        {
                                            item.city
                                        }

                                        :
                                        {" "}
                                        {
                                            item.total
                                        }

                                        declarations

                                    </Text>

                                )

                            )

                        }


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
                            INSPECTION STATISTICS
                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Total:
                            {" "}
                            {
                                dashboard?.inspectionStatistics?.total
                                ??
                                0
                            }

                        </Text>



                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Completed:
                            {" "}
                            {
                                dashboard?.inspectionStatistics?.completed
                                ??
                                0
                            }

                        </Text>



                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Pending:
                            {" "}
                            {
                                dashboard?.inspectionStatistics?.pending
                                ??
                                0
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
                            QUICK ACTIONS
                        </Text>




                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }


                            onPress={()=>{

                                navigation.navigate(
                                    "Declarations"
                                );

                            }}

                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                Search Declarations

                            </Text>


                        </TouchableOpacity>





                        <TouchableOpacity

                            style={
                                styles.menuButton
                            }


                            onPress={()=>{

                                navigation.navigate(
                                    "More"
                                );

                            }}

                        >

                            <Text
                                style={
                                    styles.menuButtonText
                                }
                            >

                                More Modules

                            </Text>


                        </TouchableOpacity>



                    </View>




                </ScrollView>





                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="Dashboard"

                />



            </View>


        </SafeScreen>

    );

}