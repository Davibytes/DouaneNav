import React from "react";


import {
    View,
    Text,
    TouchableOpacity
} from "react-native";


import {
    MaterialIcons
} from "@expo/vector-icons";


import {
    useLanguage
} from "../context/LanguageContext.js";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";


export default function BottomNavigation({

    navigation,

    active

}) {

    const {
        t
    } = useLanguage();


    const tabs = [

        {

            name:
                "Dashboard",

            label:
                t.dashboard,

            icon:
                "dashboard"

        },

        {

            name:
                "Declarations",

            label:
                t.declarations,

            icon:
                "description"

        },

        {

            name:
                "Inspection",

            label:
                t.inspection,

            icon:
                "fact-check"

        },

        {

            name:
                "DestinationMap",

            label:
                t.map,

            icon:
                "place"

        },

        {

            name:
                "More",

            label:
                t.more,

            icon:
                "menu"

        }

    ];


    return (

        <View
            style={
                styles.bottomNavigation
            }
        >

            {
                tabs.map(
                    tab => (

                        <TouchableOpacity

                            key={
                                tab.name
                            }

                            style={
                                styles.bottomNavigationItem
                            }

                            activeOpacity={
                                0.8
                            }

                            onPress={() => {

                                if (
                                    tab.name !== active
                                ) {

                                    navigation.navigate(
                                        tab.name
                                    );

                                }

                            }}

                        >

                            <MaterialIcons

                                name={
                                    tab.icon
                                }

                                size={
                                    24
                                }

                                color={

                                    active === tab.name

                                        ?

                                        colors.green

                                        :

                                        colors.muted

                                }

                            />


                            <Text

                                numberOfLines={
                                    2
                                }

                                adjustsFontSizeToFit={
                                    true
                                }

                                minimumFontScale={
                                    0.8
                                }

                                style={[

                                    styles.bottomNavigationText,

                                    {

                                        color:

                                            active === tab.name

                                                ?

                                                colors.green

                                                :

                                                colors.muted,

                                        marginTop:
                                            3

                                    }

                                ]}

                            >

                                {
                                    tab.label
                                }

                            </Text>

                        </TouchableOpacity>

                    )
                )
            }

        </View>

    );

}