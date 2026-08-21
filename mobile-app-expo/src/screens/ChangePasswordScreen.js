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
                    t.missingInformation,
                    t.newPasswordRequired
                );

                return;

            }


            if (
                newPassword.length < 8
            ) {

                Alert.alert(
                    t.invalidPassword,
                    t.passwordMinimumLength
                );

                return;

            }


            if (
                newPassword !==
                confirmPassword
            ) {

                Alert.alert(
                    t.passwordsDoNotMatch,
                    t.passwordsMustMatch
                );

                return;

            }


            try {

                await changePassword(
                    newPassword
                );


                Alert.alert(
                    t.success,
                    t.passwordChanged,
                    [
                        {
                            text:
                                t.continue,

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
                    t.error,
                    error.response?.data?.error ||
                    error.message ||
                    t.unableToChangePassword
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
                    {t.changePasswordTitle}
                </Text>


                <Text
                    style={
                        styles.subtitle
                    }
                >
                    {t.changePasswordSubtitle}
                </Text>


                <TextInput
                    style={
                        styles.input
                    }
                    placeholder={
                        t.newPassword
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
                        t.confirmNewPassword
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
                                ? t.saving
                                : t.changePasswordTitle
                        }
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeScreen>

    );

}
