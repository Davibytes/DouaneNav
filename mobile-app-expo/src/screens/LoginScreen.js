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

import {
    useAuth
} from "../context/AuthContext.js";

import {
    useLanguage
} from "../context/LanguageContext.js";

import {
    translations
} from "../i18n/index.js";

import SafeScreen from "../components/SafeScreen.js";

import colors from "../styles/colors.js";
import styles from "../styles/styles.js";

export default function LoginScreen({
    navigation
}){

    const {
        login,
        loading
    } = useAuth();

    const {
        language,
        changeLanguage
    } = useLanguage();

    const t =
        translations[language];

    const [
        email,
        setEmail
    ] = useState("");

    const [
        password,
        setPassword
    ] = useState("");

    const handleLogin = async()=>{

        if(
            !email ||
            !password
        ){

            Alert.alert(

                "Missing information",

                "Please enter your email and password."

            );

            return;

        }

        try{

            await login(

                email.trim(), password

            );

            Alert.alert(

                "Success", "Login successful"

            );

        }

        catch(error){

            Alert.alert(

                "Login failed",

                error.response?.data?.error

                ||

                error.message

                ||

                "Unable to login."

            );

        }

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
                            color:
                            colors.green
                        }
                    ]}
                >
                    DouaneNav
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
                    {t.loginTitle}
                </Text>

                <Text
                    style={
                        styles.subtitle
                    }
                >
                    {t.loginSubtitle}
                </Text>

                <TextInput

                    style={
                        styles.input
                    }

                    placeholder={t.email}

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

                    placeholder={t.password}

                    placeholderTextColor={
                        colors.muted
                    }

                    value={
                        password
                    }

                    onChangeText={
                        setPassword
                    }

                    secureTextEntry

                />

                <TouchableOpacity

                    onPress={()=>{

                        navigation.navigate(
                            "ForgotPassword"
                        );

                    }}

                >

                    <Text
                        style={
                            styles.language
                        }
                    >
                        {t.forgotPassword}
                    </Text>

                </TouchableOpacity>

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

                            t.signingIn

                            :

                            t.signIn
                        }

                    </Text>

                </TouchableOpacity>

                <View
                    style={{
                        flexDirection:"row",
                        justifyContent:"center",
                        marginTop:25
                    }}
                >

                    <TouchableOpacity

                        onPress={()=>{

                            changeLanguage("FR");

                        }}

                    >

                        <Text
                            style={[
                                styles.language,
                                {
                                    marginTop:0,
                                    fontWeight:
                                    language==="FR"
                                    ?
                                    "700"
                                    :
                                    "400"
                                }
                            ]}
                        >
                            FR
                        </Text>

                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.language,
                            {
                                marginTop:0,
                                marginHorizontal:8,
                                color:colors.muted
                            }
                        ]}
                    >
                        |
                    </Text>

                    <TouchableOpacity

                        onPress={()=>{

                            changeLanguage("EN");

                        }}

                    >

                        <Text
                            style={[
                                styles.language,
                                {
                                    marginTop:0,
                                    fontWeight:
                                    language==="EN"
                                    ?
                                    "700"
                                    :
                                    "400"
                                }
                            ]}
                        >
                            EN
                        </Text>

                    </TouchableOpacity>

                </View>

            </View>

        </SafeScreen>

    );

}