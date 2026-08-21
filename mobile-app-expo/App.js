import {
    NavigationContainer
} from "@react-navigation/native";

import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";

import {
    View,
    ActivityIndicator
} from "react-native";

import {
    LanguageProvider
} from "./src/context/LanguageContext.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import DashboardScreen from "./src/screens/DashboardScreen.js";
import DeclarationsScreen from "./src/screens/DeclarationsScreen.js";
import DeclarationDetailsScreen from "./src/screens/DeclarationDetailsScreen.js";
import DestinationMapScreen from "./src/screens/DestinationMapScreen.js";
import InspectionScreen from "./src/screens/InspectionScreen.js";
import MoreScreen from "./src/screens/MoreScreen.js";
import ReportScreen from "./src/screens/ReportScreen.js";
import AIAnalysisScreen from "./src/screens/AIAnalysisScreen.js";
import SyncStatusScreen from "./src/screens/SyncStatusScreen.js";
import ProfileScreen from "./src/screens/ProfileScreen.js";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen.js";
import ChangePasswordScreen from "./src/screens/ChangePasswordScreen.js";
import {
    AuthProvider,
    useAuth
} from "./src/context/AuthContext.js";


import colors from "./src/styles/colors.js";


const Stack =
    createNativeStackNavigator();



function AppNavigator(){


    const {
        user,
        authChecking
    } = useAuth();



    if(authChecking){

        return (

            <View

                style={{

                    flex:1,

                    justifyContent:"center",

                    alignItems:"center",

                    backgroundColor:
                    colors.background

                }}

            >

                <ActivityIndicator

                    size="large"

                    color={colors.primary}

                />

            </View>

        );

    }



    return (

        <Stack.Navigator

            screenOptions={{

                headerShown:false

            }}

        >


        <Stack.Screen
            name="ForgotPassword"

            component={ForgotPasswordScreen}
        />


        {
            user ? (

                user.mustChangePassword ? (

                    <Stack.Screen
                        name="ChangePassword"

                        component={ChangePasswordScreen}
                    />

                ) : (

                <>


                <Stack.Screen

                    name="Dashboard"

                    component={DashboardScreen}

                />


                <Stack.Screen

                    name="Declarations"

                    component={DeclarationsScreen}

                />

                <Stack.Screen

                    name="DeclarationDetails"

                    component={DeclarationDetailsScreen}

                />


                <Stack.Screen

                    name="DestinationMap"

                    component={DestinationMapScreen}

                />


                <Stack.Screen

                    name="Inspection"

                    component={InspectionScreen}

                />


                <Stack.Screen

                    name="Reports"

                    component={ReportScreen}

                />


                <Stack.Screen

                    name="More"

                    component={MoreScreen}

                />


                <Stack.Screen

                    name="AIAnalysis"

                    component={AIAnalysisScreen}

                />


                <Stack.Screen

                    name="SyncStatus"

                    component={SyncStatusScreen}

                />


                <Stack.Screen

                    name="Profile"

                    component={ProfileScreen}

                />

                </>

                )


            ) : (


                <Stack.Screen

                    name="Login"

                    component={LoginScreen}

                />


            )

        }



        </Stack.Navigator>


    );


}




export default function App(){


    return (

       <AuthProvider>

    <LanguageProvider>


        <NavigationContainer>


            <AppNavigator />


        </NavigationContainer>


    </LanguageProvider>


</AuthProvider>

    );

}
