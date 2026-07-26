import {
    View,
    Text,
    TouchableOpacity
} from "react-native";


import styles from "../styles/styles.js";
import colors from "../styles/colors.js";



export default function BottomNavigation({

    navigation,

    active

}){


    const tabs = [

        {
            name:"Dashboard",
            label:"Home",
            icon:"⌂"
        },


        {
            name:"Declarations",
            label:"Decl.",
            icon:"≣"
        },


        {
            name:"Inspection",
            label:"Inspect",
            icon:"✓"
        },


        {
            name:"DestinationMap",
            label:"Map",
            icon:"⌖"
        },


        {
            name:"More",
            label:"More",
            icon:"⋮"
        }

    ];



    return (

        <View
            style={
                styles.bottomNavigation
            }
        >

            {
                tabs.map((tab)=>(

                    <TouchableOpacity

                        key={tab.name}

                        style={
                            styles.bottomNavigationItem
                        }


                        onPress={()=>{

                            if(tab.name !== active){

                                navigation.navigate(
                                    tab.name
                                );

                            }

                        }}

                    >


                        <Text

                            style={[

                                styles.bottomNavigationIcon,

                                {

                                    color:

                                    active === tab.name

                                    ? colors.green

                                    : colors.muted

                                }

                            ]}

                        >

                            {tab.icon}

                        </Text>




                        <Text

                            style={[

                                styles.bottomNavigationText,

                                {

                                    color:

                                    active === tab.name

                                    ? colors.green

                                    : colors.muted

                                }

                            ]}

                        >

                            {tab.label}

                        </Text>


                    </TouchableOpacity>

                ))
            }


        </View>

    );

}