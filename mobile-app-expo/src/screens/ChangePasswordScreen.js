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


export default function ChangePasswordScreen({
    navigation
}) {

    const {
        changePassword,
        loading
    } = useAuth();


    const {
        language
    } = useLanguage();


    const t =
        translations[language];


    const [
        newPassword,
        setNewPassword
    ] = useState("");


    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");


    const handleChangePassword =
        async () => {

            if (
                !newPassword ||
                !confirmPassword
            ) {

                Alert.alert(
                    "Missing information",
                    "Please enter and confirm your new password."
                );

                return;

            }


            if (
                newPassword.length < 8
            ) {

                Alert.alert(
                    "Invalid password",
                    "Password must contain at least 8 characters."
                );

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                Alert.alert(
                    "Passwords do not match",
                    "Please make sure both passwords are identical."
                );

                return;

            }


            try {

                await changePassword(
                    newPassword
                );


                Alert.alert(
                    "Success",
                    "Your password has been changed successfully.",
                    [
                        {
                            text:
                                "Continue",

                            onPress:
                                () =>
                                    navigation.replace(
                                        "Dashboard"
                                    )
                        }
                    ]
                );

            }
            catch (error) {

                Alert.alert(
                    "Error",
                    error.response?.data?.error ||
                    error.message ||
                    "Unable to change password."
                );

            }

        };


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
                    Change Password
                </Text>


                <Text
                    style={
                        styles.subtitle
                    }
                >
                    Please create a new password before continuing.
                </Text>


                <TextInput
                    style={
                        styles.input
                    }
                    placeholder={
                        "New password"
                    }
                    placeholderTextColor={
                        colors.muted
                    }
                    value={
                        newPassword
                    }
                    onChangeText={
                        setNewPassword
                    }
                    secureTextEntry
                />


                <TextInput
                    style={
                        styles.input
                    }
                    placeholder={
                        "Confirm new password"
                    }
                    placeholderTextColor={
                        colors.muted
                    }
                    value={
                        confirmPassword
                    }
                    onChangeText={
                        setConfirmPassword
                    }
                    secureTextEntry
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
                        handleChangePassword
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
                                ? "Saving..."
                                : "Change Password"
                        }
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeScreen>

    );

}