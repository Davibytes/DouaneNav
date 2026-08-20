import {
    SafeAreaView
} from "react-native-safe-area-context";

import {
    View,
    Image,
    TouchableOpacity
} from "react-native";

import {
    Ionicons
} from "@expo/vector-icons";

import {
    useNavigation,
    useRoute
} from "@react-navigation/native";

import styles from "../styles/styles.js";

import colors from "../styles/colors.js";


export default function SafeScreen({
    children
}) {

    const navigation =
        useNavigation();

    const route =
        useRoute();


    const publicRoutes = [
        "Login",
        "ForgotPassword",
        "ChangePassword"
    ];


    const showHeader =
        !publicRoutes.includes(
            route.name
        );


    return (

        <SafeAreaView
            style={
                styles.safeScreen
            }
        >

            {
                showHeader && (

                    <View
                        style={{
                            height: 54,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            justifyContent:
                                "flex-end",

                            paddingHorizontal:
                                16,

                            borderBottomWidth:
                                1,

                            borderBottomColor:
                                colors.border,

                            backgroundColor:
                                colors.background
                        }}
                    >

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate(
                                    "Profile"
                                )
                            }
                            style={{
                                width: 38,
                                height: 38,
                                borderRadius: 19,
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                marginRight: 8
                            }}
                        >

                            <Ionicons
                                name="person-circle-outline"
                                size={29}
                                color={
                                    colors.green
                                }
                            />

                        </TouchableOpacity>


                        <Image

                            source={
                                require(
                                    "../assets/logo.png"
                                )
                            }

                            style={{
                                width: 34,
                                height: 34,
                                resizeMode:
                                    "contain"
                            }}

                        />

                    </View>

                )
            }


            <View
                style={{
                    flex: 1
                }}
            >

                {children}

            </View>

        </SafeAreaView>

    );

}