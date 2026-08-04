import {
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
    useLanguage
} from "../context/LanguageContext.js";

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


    const {
        t
    } = useLanguage();




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

                        {t.welcome}

                    </Text>



                    <Text

                        style={
                            styles.dashboardRole
                        }

                    >

                        {
                            user?.name
                            ||
                            t.customsOfficer
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

                            {t.activeAlerts}

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

                                t.noActiveAlerts

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

                            {t.todaysOperations}

                        </Text>




                        <Text

                            style={
                                styles.operationItem
                            }

                        >

                            {t.todaysDeclarations}:
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

                            {t.pendingInspections}:
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

                            {t.completedInspections}:
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

                            {t.pendingSynchronizations}:
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

                            {t.recentInspections}

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
                                                t.unknown
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
                                                t.pending
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

                                {t.noRecentInspections}

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

                            {t.commonDestinations}

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

                                        {" "}
                                        {t.declarationsCount}

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

                            {t.inspectionStatistics}

                        </Text>




                        <Text

                            style={
                                styles.operationItem
                            }

                        >

                            {t.total}:
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

                            {t.completed}:
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

                            {t.pending}:
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

                            {t.quickActions}

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

                                {t.searchDeclarations}

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

                                {t.moreModules}

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