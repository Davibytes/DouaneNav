import {
    View,
    Text,
    ScrollView,
    TouchableOpacity
} from "react-native";


import {
    Ionicons
} from "@expo/vector-icons";


import SafeScreen from "../components/SafeScreen.js";
import BottomNavigation from "../components/BottomNavigation.js";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function MoreScreen({
    navigation
}) {

    const {
        t
    } = useLanguage();


    const modules = [

        {
            title:
                t.inspectionReports,

            description:
                t.inspectionReportsDescription,

            screen:
                "Reports",

            icon:
                "document-text"

        },


        {
            title:
                t.aiAnalysis,

            description:
                t.aiAnalysisDescription,

            screen:
                "AIAnalysis",

            icon:
                "analytics"

        },


        {
            title:
                t.syncStatus,

            description:
                t.syncStatusDescription,

            screen:
                "SyncStatus",

            icon:
                "sync"

        },


        {
            title:
                t.profile,

            description:
                t.profileDescription,

            screen:
                "Profile",

            icon:
                "person"

        }

    ];


    return (

        <SafeScreen>

            <View
                style={{
                    flex: 1
                }}
            >

                <ScrollView

                    contentContainerStyle={
                        styles.dashboardContainer
                    }

                >

                    <Text
                        style={
                            styles.dashboardGreeting
                        }
                    >
                        {t.more}
                    </Text>


                    <Text
                        style={
                            styles.dashboardRole
                        }
                    >
                        {t.additionalModules}
                    </Text>


                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent:
                                "space-between"
                        }}
                    >

                        {
                            modules.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <TouchableOpacity

                                        key={
                                            index
                                        }

                                        style={{
                                            backgroundColor:
                                                colors.surface,

                                            width:
                                                "48%",

                                            minHeight:
                                                150,

                                            borderRadius:
                                                14,

                                            padding:
                                                18,

                                            marginBottom:
                                                15,

                                            elevation:
                                                3,

                                            borderLeftWidth:
                                                4,

                                            borderLeftColor:
                                                colors.green
                                        }}

                                        onPress={() =>
                                            navigation.navigate(
                                                item.screen
                                            )
                                        }

                                    >

                                        <Ionicons

                                            name={
                                                item.icon
                                            }

                                            size={
                                                32
                                            }

                                            color={
                                                colors.green
                                            }

                                            style={{
                                                marginBottom:
                                                    15
                                            }}

                                        />


                                        <Text
                                            style={{
                                                fontSize:
                                                    16,

                                                fontWeight:
                                                    "700",

                                                color:
                                                    colors.text,

                                                marginBottom:
                                                    8
                                            }}
                                        >
                                            {
                                                item.title
                                            }
                                        </Text>


                                        <Text
                                            style={{
                                                fontSize:
                                                    13,

                                                color:
                                                    colors.muted,

                                                lineHeight:
                                                    18
                                            }}
                                        >
                                            {
                                                item.description
                                            }
                                        </Text>

                                    </TouchableOpacity>

                                )
                            )
                        }

                    </View>

                </ScrollView>


                <BottomNavigation

                    navigation={
                        navigation
                    }

                    active="More"

                />

            </View>

        </SafeScreen>

    );

}