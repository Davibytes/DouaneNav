import { 
    useState 
} from "react";


import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";


import { 
    useAuth 
} from "../context/AuthContext.js";


import colors from "../styles/colors.js";
import styles from "../styles/styles.js";


import SafeScreen from "../components/SafeScreen.js";
console.log("LOGIN SCREEN LOADED");


export default function LoginScreen() {
console.log("🔥 USING THIS LOGIN SCREEN FILE 🔥");

    const {
        login,
        loading
    } = useAuth();



    const [
        email,
        setEmail
    ] = useState("");



    const [
        password,
        setPassword
    ] = useState("");


const handleLogin = async () => {

    alert(
        `Email: ${email}\nPassword: ${password}`
    );

    try {

        await login(
            email,
            password
        );

    } catch(error){

        alert(
            error.message
        );

    }

};
    // const handleLogin = async () => {


    //     alert("BUTTON PRESSED");


    //     console.log(
    //         "LOGIN START:",
    //         email,
    //         password
    //     );



    //     try {


    //         const result = 
    //             await login(
    //                 email,
    //                 password
    //             );



    //         console.log(
    //             "LOGIN SUCCESS RESULT:",
    //             result
    //         );


    //     }


    //     catch(error){


    //         console.log(
    //             "LOGIN FAILED:",
    //             error.response?.data ||
    //             error.message
    //         );


    //     }


    // };





    return (

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
                            color:
                            colors.green
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

                    Welcome back

                </Text>





                <Text
                    style={
                        styles.subtitle
                    }
                >

                    Sign in with your authorized CustomsTrack AI account.

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







                <TextInput

                    style={
                        styles.input
                    }


                    placeholder="Password"


                    placeholderTextColor={
                        colors.muted
                    }


                    secureTextEntry


                    value={
                        password
                    }


                    onChangeText={
                        setPassword
                    }

                />







                <TouchableOpacity


                    style={[
                        styles.button,
                        {
                            backgroundColor:
                            colors.green
                        }
                    ]}


                    onPress={
                        handleLogin
                    }


                    disabled={
                        loading
                    }


                >



                    <Text

                        style={
                            styles.buttonText
                        }

                    >

                        {
                            loading
                            ?
                            "Signing in..."
                            :
                            "Sign in securely"
                        }


                    </Text>



                </TouchableOpacity>







                <Text

                    style={
                        styles.language
                    }

                >

                    FR | EN

                </Text>




            </View>




        </SafeScreen>

    );

}