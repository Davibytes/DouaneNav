import {
    View,
    Text,
    TouchableOpacity
} from "react-native";


import SafeScreen from "../components/SafeScreen.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function ForgotPasswordScreen({
    navigation
}) {

    const {
        t
    } = useLanguage();


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
                    {t.forgotPassword}
                </Text>


                <Text
                    style={
                        styles.subtitle
                    }
                >
                    {t.forgotPasswordInstructions}
                </Text>


                <TouchableOpacity

                    style={
                        styles.button
                    }

                    onPress={() =>
                        navigation.goBack()
                    }

                >

                    <Text
                        style={
                            styles.buttonText
                        }
                    >
                        {t.backToLogin}
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeScreen>

    );

}