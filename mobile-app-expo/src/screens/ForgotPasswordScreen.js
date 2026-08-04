import {
    useState
} from "react";


import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";

import colors from "../styles/colors.js";
import styles from "../styles/styles.js";



export default function ForgotPasswordScreen({
    navigation
}){


    const [
        email,
        setEmail
    ] = useState("");



    const handleReset = ()=>{


        if(!email){


            Alert.alert(
                "Missing information",
                "Please enter your email address."
            );


            return;

        }



        Alert.alert(

            "Password Recovery",

            "A password recovery request has been created. Contact your administrator to complete the reset process."

        );


    };



    return(


        <SafeScreen>


            <View

                style={
                    styles.loginContainer
                }

            >



                <Text

                    style={[
                        styles.logoText,
                        {
                            color:colors.green
                        }
                    ]}

                >

                    CustomsTrack AI

                </Text>



                <Text

                    style={
                        styles.eyebrow
                    }

                >

                    CAMEROON CUSTOMS

                </Text>




                <Text

                    style={
                        styles.loginTitle
                    }

                >

                    Forgot Password

                </Text>




                <Text

                    style={
                        styles.subtitle
                    }

                >

                    Enter your authorized account email to request password recovery.

                </Text>




                <TextInput

                    style={
                        styles.input
                    }

                    placeholder="Email"

                    placeholderTextColor={
                        colors.muted
                    }

                    value={
                        email
                    }

                    onChangeText={
                        setEmail
                    }

                    autoCapitalize="none"

                    keyboardType="email-address"

                />





                <TouchableOpacity

                    style={
                        styles.button
                    }

                    onPress={
                        handleReset
                    }

                >

                    <Text

                        style={
                            styles.buttonText
                        }

                    >

                        Request Recovery

                    </Text>


                </TouchableOpacity>




                <TouchableOpacity

                    onPress={()=>navigation.goBack()}

                >

                    <Text

                        style={
                            styles.language
                        }

                    >

                        Back to Login

                    </Text>


                </TouchableOpacity>



            </View>



        </SafeScreen>


    );


}