import {
    useEffect,
    useState
} from "react";


import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator
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


            setStatus(
                data
            );

        }
        catch(error){

            console.log(
                "Sync status error:",
                error.message
            );

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





    return (

        <SafeScreen>

            <View
                style={{
                    flex:1
                }}
            >


                <View
                    style={
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
                        CAMCIS synchronization status
                    </Text>





                    {
                        status && (

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
                                    Last Synchronization
                                </Text>


                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    Status:
                                    {" "}
                                    {
                                        status.status
                                    }
                                </Text>


                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    System:
                                    {" "}
                                    {
                                        status.system
                                    }
                                </Text>


                                <Text
                                    style={
                                        styles.sectionText
                                    }
                                >
                                    {
                                        status.message
                                    }
                                </Text>


                            </View>

                        )
                    }





                    <TouchableOpacity

                        style={
                            styles.menuButton
                        }

                        onPress={
                            runSync
                        }

                    >

                        {

                            loading ?

                            <ActivityIndicator />

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



                </View>



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