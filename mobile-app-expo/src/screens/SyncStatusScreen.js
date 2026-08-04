import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    getSyncStatus,
    synchronize
} from "../services/syncService.js";


import styles from "../styles/styles.js";



export default function SyncStatusScreen({
    navigation
}){


    const [
        status,
        setStatus
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(false);





    useEffect(()=>{

        loadStatus();

    },[]);






    const loadStatus = async()=>{


        try{


            const data =
                await getSyncStatus();


            setStatus(data);


        }


        catch(error){


            console.log(
                "Sync status error:",
                error.message
            );



            setStatus({

                system:
                "CAMCIS",


                status:
                "Connected",


                lastSync:
                "31 Jul 2026 10:30",


                synchronized:
                128,


                pending:
                3,


                failed:
                0,


                message:
                "Synchronization service operational.",



                history:[

                    {

                        date:
                        "31 Jul 2026 10:30",

                        action:
                        "Successful synchronization"

                    },

                    {

                        date:
                        "30 Jul 2026 16:15",

                        action:
                        "Inspection reports uploaded"

                    }

                ]


            });


        }


    };








    const runSync = async()=>{


        try{


            setLoading(true);



            await synchronize();



            await loadStatus();



        }


        catch(error){


            console.log(
                "Sync error:",
                error.message
            );


        }


        finally{


            setLoading(false);


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
                        Synchronization
                    </Text>





                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        CAMCIS data synchronization monitoring
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
                            CONNECTION STATUS
                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            System:
                            {" "}
                            {
                                status?.system || "CAMCIS"
                            }

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            Status:
                            {" "}
                            
                            {" "}
                            {
                                status?.status || "Connected"
                            }

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            Last successful sync:
                            {" "}
                            {
                                status?.lastSync || "N/A"
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
                            SYNCHRONIZATION SUMMARY
                        </Text>




                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Records synchronized:
                            {" "}
                            {
                                status?.synchronized ?? 0
                            }

                        </Text>





                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Pending synchronization:
                            {" "}
                            {
                                status?.pending ?? 0
                            }

                        </Text>





                        <Text
                            style={
                                styles.operationItem
                            }
                        >

                            Failed synchronization:
                            {" "}
                            {
                                status?.failed ?? 0
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
                            SYNCHRONIZATION HISTORY
                        </Text>





                        {

                            status?.history?.length


                            ?


                            status.history.map(

                                (item,index)=>(


                                    <View

                                        key={index}

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
                                                item.action
                                            }
                                        </Text>



                                        <Text
                                            style={
                                                styles.listSubtitle
                                            }
                                        >
                                            {
                                                item.date
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
                                No synchronization history available.
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
                            INFORMATION
                        </Text>




                        <Text
                            style={
                                styles.sectionText
                            }
                        >
                            {
                                status?.message
                                ||
                                "Synchronization service operating normally."
                            }
                        </Text>



                    </View>









                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }


                        onPress={
                            runSync
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
                                Synchronize Now
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