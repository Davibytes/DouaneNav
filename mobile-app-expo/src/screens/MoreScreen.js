import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";

import styles from "../styles/styles.js";



export default function MoreScreen({
    navigation
}){


    const menu = [

        {
            title:"Inspection Reports",
            screen:"Reports"
        },


        {
            title:"AI Analysis",
            screen:"AIAnalysis"
        },


        {
            title:"Synchronization Status",
            screen:"SyncStatus"
        },


        {
            title:"Profile",
            screen:"Profile"
        }

    ];



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
                        More
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        Additional system options
                    </Text>





                    {
                        menu.map(
                            (item,index)=>(


                                <TouchableOpacity

                                    key={index}

                                    style={
                                        styles.section
                                    }


                                    onPress={()=>{

                                        navigation.navigate(
                                            item.screen
                                        );

                                    }}

                                >

                                    <Text
                                        style={
                                            styles.sectionTitle
                                        }
                                    >

                                        {
                                            item.title
                                        }

                                    </Text>


                                </TouchableOpacity>


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