import {
    View,
    Text
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import styles from "../styles/styles.js";



export default function ProfileScreen({
    navigation
}){


    const user = {

        name:
        "Amina Ndi",

        role:
        "Administrator",

        email:
        "admin@douanenav.cm"

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

                        Profile

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

                            User Information

                        </Text>




                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            Name:
                            {" "}
                            {
                                user.name
                            }

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            Role:
                            {" "}
                            {
                                user.role
                            }

                        </Text>





                        <Text
                            style={
                                styles.sectionText
                            }
                        >

                            Email:
                            {" "}
                            {
                                user.email
                            }

                        </Text>


                    </View>



                </View>





                <BottomNavigation

                    navigation={navigation}

                    active="More"

                />


            </View>


        </SafeScreen>

    );

}