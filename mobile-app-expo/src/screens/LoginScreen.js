import { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";

import { useAuth } from "../context/AuthContext.js";

import colors from "../styles/colors.js";
import styles from "../styles/styles.js";

import SafeScreen from "../components/SafeScreen.js";


export default function LoginScreen() {

    const {
        login,
        loading
    } = useAuth();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");



    const handleLogin = async () => {

        console.log(
            "LOGIN:",
            email,
            password
        );


        try {

            await login(
                email,
                password
            );


        }
        catch(error){

            console.log(
                "LOGIN ERROR:",
                error.response?.data ||
                error.message
            );

        }

    };



    return (

        <SafeScreen>

            <View
                style={styles.loginContainer}
            >

                <Text
                    style={[
                        styles.logoText,
                        {
                            color:
                                colors.primary
                        }
                    ]}
                >
                    CustomsTrack AI
                </Text>


                <Text
                    style={styles.eyebrow}
                >
                    CAMEROON CUSTOMS
                </Text>


                <Text
                    style={styles.loginTitle}
                >
                    Welcome back
                </Text>


                <Text
                    style={styles.subtitle}
                >
                    Sign in with your authorized CustomsTrack AI account.
                </Text>


                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={
                        colors.muted
                    }
                    value={email}
                    onChangeText={
                        setEmail
                    }
                    autoCapitalize="none"
                    keyboardType="email-address"
                />


                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={
                        colors.muted
                    }
                    secureTextEntry
                    value={password}
                    onChangeText={
                        setPassword
                    }
                />


                <TouchableOpacity
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                colors.primary
                        }
                    ]}
                    onPress={handleLogin}
                    disabled={loading}
                >

                    <Text
                        style={styles.buttonText}
                    >
                        {
                            loading
                            ? "Signing in..."
                            : "Sign in securely"
                        }
                    </Text>

                </TouchableOpacity>


                <Text
                    style={styles.language}
                >
                    FR | EN
                </Text>


            </View>

        </SafeScreen>

    );

}