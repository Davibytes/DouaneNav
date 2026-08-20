import {
    View,
    Text,
    TouchableOpacity
} from "react-native";


import {
    useLanguage
} from "../context/LanguageContext.js";


import {
    translations
} from "../i18n/index.js";


import SafeScreen from "../components/SafeScreen.js";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function ForgotPasswordScreen({
    navigation
}) {

    const {
        language
    } = useLanguage();


    const t =
        translations[language];


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
                    {
                        language === "FR"

                            ?

                            "Pour réinitialiser votre mot de passe, veuillez contacter l'administrateur de votre compte afin d'obtenir de nouvelles informations d'accès."

                            :

                            "To reset your password, please contact your account administrator to receive new temporary credentials."
                    }
                </Text>


                <TouchableOpacity

                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                colors.green
                        }
                    ]}

                    onPress={() =>
                        navigation.goBack()
                    }

                >

                    <Text
                        style={
                            styles.buttonText
                        }
                    >
                        {
                            language === "FR"
                                ? "Retour à la connexion"
                                : "Back to Login"
                        }
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeScreen>

    );

}