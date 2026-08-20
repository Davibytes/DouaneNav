import {
    View,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";


import {
    Ionicons
} from "@expo/vector-icons";


import SafeScreen from "../components/SafeScreen.js";

import BottomNavigation from "../components/BottomNavigation.js";


import {
    useAuth
} from "../context/AuthContext.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import {
    translations
} from "../i18n/index.js";


import styles from "../styles/styles.js";

import colors from "../styles/colors.js";


export default function ProfileScreen({
    navigation
}) {

    const {
        user,
        logout
    } = useAuth();


    const {
        language,
        changeLanguage
    } = useLanguage();


    const t =
        translations[language];


    const permissions =
        user?.permissions || [];


    return (

        <SafeScreen>

            <View
                style={{
                    flex: 1
                }}
            >

                <ScrollView

                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 28,
                        paddingBottom: 140
                    }}

                    showsVerticalScrollIndicator={false}

                >

                    {/* Header */}

                    <View
                        style={{
                            marginBottom: 28
                        }}
                    >

                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: "800",
                                color: colors.text
                            }}
                        >
                            {t.profile}
                        </Text>


                        <Text
                            style={{
                                marginTop: 6,
                                fontSize: 14,
                                color: colors.muted
                            }}
                        >
                            {t.officerAccountInformation}
                        </Text>

                    </View>


                    {/* Profile identity */}

                    <View
                        style={{
                            alignItems: "center",
                            marginBottom: 32
                        }}
                    >

                        <View
                            style={{
                                width: 88,
                                height: 88,
                                borderRadius: 44,
                                backgroundColor:
                                    colors.green,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 14
                            }}
                        >

                            <Ionicons
                                name="person"
                                size={42}
                                color={colors.white}
                            />

                        </View>


                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: "800",
                                color: colors.text
                            }}
                        >
                            {
                                user?.name ||
                                t.customsOfficer
                            }
                        </Text>


                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 15,
                                color: colors.muted
                            }}
                        >
                            {
                                user?.role ||
                                t.officer
                            }
                        </Text>


                        <Text
                            style={{
                                marginTop: 4,
                                fontSize: 14,
                                color: colors.muted
                            }}
                        >
                            {
                                user?.email ||
                                t.notAvailable
                            }
                        </Text>

                    </View>


                    {/* Account */}

                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "800",
                            color: colors.muted,
                            marginBottom: 8,
                            letterSpacing: 0.7
                        }}
                    >
                        ACCOUNT
                    </Text>


                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: colors.border
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                minHeight: 62,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border
                            }}
                            onPress={() => {}}
                        >

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >

                                <Ionicons
                                    name="person-outline"
                                    size={22}
                                    color={colors.green}
                                />


                                <Text
                                    style={{
                                        marginLeft: 14,
                                        fontSize: 16,
                                        color: colors.text,
                                        fontWeight: "600"
                                    }}
                                >
                                    Personal information
                                </Text>

                            </View>


                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.muted}
                            />

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                minHeight: 62,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border
                            }}
                            onPress={() =>
                                navigation.navigate(
                                    "ChangePassword"
                                )
                            }
                        >

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >

                                <Ionicons
                                    name="lock-closed-outline"
                                    size={22}
                                    color={colors.green}
                                />


                                <Text
                                    style={{
                                        marginLeft: 14,
                                        fontSize: 16,
                                        color: colors.text,
                                        fontWeight: "600"
                                    }}
                                >
                                    Change password
                                </Text>

                            </View>


                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={colors.muted}
                            />

                        </TouchableOpacity>

                    </View>


                    {/* Language */}

                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "800",
                            color: colors.muted,
                            marginTop: 30,
                            marginBottom: 8,
                            letterSpacing: 0.7
                        }}
                    >
                        {t.language.toUpperCase()}
                    </Text>


                    <View
                        style={{
                            flexDirection: "row",
                            borderTopWidth: 1,
                            borderTopColor: colors.border,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                flex: 1,
                                minHeight: 58,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRightWidth: 1,
                                borderRightColor: colors.border
                            }}
                            onPress={() =>
                                changeLanguage("EN")
                            }
                        >

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight:
                                        language === "EN"
                                            ? "800"
                                            : "500",
                                    color:
                                        language === "EN"
                                            ? colors.green
                                            : colors.text
                                }}
                            >
                                {t.english}
                            </Text>

                        </TouchableOpacity>


                        <TouchableOpacity
                            style={{
                                flex: 1,
                                minHeight: 58,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onPress={() =>
                                changeLanguage("FR")
                            }
                        >

                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight:
                                        language === "FR"
                                            ? "800"
                                            : "500",
                                    color:
                                        language === "FR"
                                            ? colors.green
                                            : colors.text
                                }}
                            >
                                {t.french}
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* Permissions */}

                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "800",
                            color: colors.muted,
                            marginTop: 30,
                            marginBottom: 8,
                            letterSpacing: 0.7
                        }}
                    >
                        {t.permissions.toUpperCase()}
                    </Text>


                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: colors.border
                        }}
                    >

                        {
                            permissions.length === 0

                            ?

                            <View
                                style={{
                                    minHeight: 58,
                                    justifyContent: "center",
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border
                                }}
                            >

                                <Text
                                    style={{
                                        color: colors.muted
                                    }}
                                >
                                    {t.notAvailable}
                                </Text>

                            </View>

                            :

                            permissions.map(
                                (
                                    permission,
                                    index
                                ) => (

                                    <View
                                        key={index}
                                        style={{
                                            minHeight: 52,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            borderBottomWidth: 1,
                                            borderBottomColor: colors.border
                                        }}
                                    >

                                        <Ionicons
                                            name="checkmark-circle"
                                            size={19}
                                            color={colors.green}
                                        />


                                        <Text
                                            style={{
                                                marginLeft: 12,
                                                fontSize: 14,
                                                color: colors.text
                                            }}
                                        >
                                            {permission}
                                        </Text>

                                    </View>

                                )
                            )
                        }

                    </View>


                    {/* Application */}

                    <Text
                        style={{
                            fontSize: 13,
                            fontWeight: "800",
                            color: colors.muted,
                            marginTop: 30,
                            marginBottom: 8,
                            letterSpacing: 0.7
                        }}
                    >
                        APPLICATION
                    </Text>


                    <View
                        style={{
                            borderTopWidth: 1,
                            borderTopColor: colors.border
                        }}
                    >

                        <TouchableOpacity
                            style={{
                                minHeight: 62,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                borderBottomWidth: 1,
                                borderBottomColor: colors.border
                            }}
                            onPress={() => {}}
                        >

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >

                                <Ionicons
                                    name="information-circle-outline"
                                    size={22}
                                    color={colors.green}
                                />


                                <Text
                                    style={{
                                        marginLeft: 14,
                                        fontSize: 16,
                                        color: colors.text,
                                        fontWeight: "600"
                                    }}
                                >
                                    About DouaneNav
                                </Text>

                            </View>


                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.muted
                                }}
                            >
                                Version 1.0.0
                            </Text>

                        </TouchableOpacity>

                    </View>


                    {/* Logout */}

                    <TouchableOpacity
                        style={{
                            marginTop: 34,
                            minHeight: 58,
                            alignItems: "center",
                            justifyContent: "center",
                            borderWidth: 1,
                            borderColor: colors.green,
                            borderRadius: 14
                        }}
                        onPress={logout}
                    >

                        <Text
                            style={{
                                color: colors.green,
                                fontWeight: "800",
                                fontSize: 16
                            }}
                        >
                            {t.logout}
                        </Text>

                    </TouchableOpacity>


                </ScrollView>


                <BottomNavigation
                    navigation={navigation}
                    active="More"
                />

            </View>

        </SafeScreen>

    );

}