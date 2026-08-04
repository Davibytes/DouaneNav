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
}){


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

        user?.permissions

        ||

        [

            "users:manage",

            "declarations:read",

            "inspections:read",

            "synchronization:read"

        ];





    return(


        <SafeScreen>


            <View
                style={{
                    flex:1
                }}
            >



                <ScrollView

                    contentContainerStyle={{

                        ...styles.dashboardContainer,

                        paddingBottom:140

                    }}

                >





                    <Text

                        style={
                            styles.dashboardGreeting
                        }

                    >

                        {t.profile}

                    </Text>





                    <Text

                        style={
                            styles.dashboardRole
                        }

                    >

                        {t.officerAccountInformation}

                    </Text>








                    <View

                        style={
                            styles.section
                        }

                    >




                        <View

                            style={{

                                alignItems:"center",

                                marginBottom:20

                            }}

                        >



                            <Ionicons

                                name="person-circle"

                                size={80}

                                color={colors.green}

                            />




                            <Text

                                style={{

                                    fontSize:22,

                                    fontWeight:"700",

                                    color:colors.text,

                                    marginTop:10

                                }}

                            >

                                {

                                    user?.name

                                    ||

                                    t.customsOfficer

                                }


                            </Text>




                            <Text

                                style={
                                    styles.mutedText
                                }

                            >

                                {

                                    user?.role

                                    ||

                                    t.officer

                                }

                            </Text>




                        </View>







                        <Text

                            style={
                                styles.sectionText
                            }

                        >

                            {t.email}:{" "}

                            {

                                user?.email

                                ||

                                t.notAvailable

                            }


                        </Text>





                        <Text

                            style={
                                styles.sectionText
                            }

                        >

                            {t.status}:{" "}

                            {t.active}


                        </Text>





                    </View>









                    <View

                        style={
                            styles.section
                        }

                    >




                        <Text

                            style={
                                styles.sectionTitle
                            }

                        >

                            {t.language}

                        </Text>







                        <View

                            style={{

                                flexDirection:"row",

                                justifyContent:"space-between",

                                marginTop:10

                            }}

                        >






                            <TouchableOpacity


                                style={[

                                    styles.menuButton,

                                    {

                                        flex:1,

                                        marginRight:8,

                                        backgroundColor:

                                        language==="EN"

                                        ?

                                        colors.greenDark

                                        :

                                        colors.green

                                    }

                                ]}



                                onPress={()=>{

                                    changeLanguage("EN");

                                }}



                            >



                                <Text

                                    style={
                                        styles.menuButtonText
                                    }

                                >

                                    {t.english}

                                </Text>



                            </TouchableOpacity>








                            <TouchableOpacity


                                style={[

                                    styles.menuButton,

                                    {

                                        flex:1,

                                        marginLeft:8,

                                        backgroundColor:

                                        language==="FR"

                                        ?

                                        colors.greenDark

                                        :

                                        colors.green

                                    }

                                ]}




                                onPress={()=>{

                                    changeLanguage("FR");

                                }}



                            >



                                <Text

                                    style={
                                        styles.menuButtonText
                                    }

                                >

                                    {t.french}

                                </Text>



                            </TouchableOpacity>





                        </View>





                    </View>









                    <View

                        style={
                            styles.section
                        }

                    >





                        <Text

                            style={
                                styles.sectionTitle
                            }

                        >

                            {t.permissions}

                        </Text>







                        {

                            permissions.map(

                                (permission,index)=>(



                                    <View

                                        key={index}

                                        style={{

                                            flexDirection:"row",

                                            alignItems:"center",

                                            marginBottom:10

                                        }}

                                    >





                                        <Ionicons

                                            name="checkmark-circle"

                                            size={18}

                                            color={colors.green}

                                        />





                                        <Text

                                            style={{

                                                marginLeft:8,

                                                color:colors.text,

                                                fontSize:14

                                            }}

                                        >

                                            {permission}

                                        </Text>





                                    </View>



                                )

                            )


                        }






                    </View>









                    <TouchableOpacity


                        style={[

                            styles.logoutButton,

                            {

                                marginBottom:20

                            }

                        ]}



                        onPress={logout}



                    >





                        <Text

                            style={{

                                color:colors.green,

                                fontWeight:"700",

                                fontSize:16

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