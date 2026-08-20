import {
    NavigationContainer
} from "@react-navigation/native";


import {
    createNativeStackNavigator
} from "@react-navigation/native-stack";



import LoginScreen from "../screens/LoginScreen.js";
import DashboardScreen from "../screens/DashboardScreen.js";
import DeclarationsScreen from "../screens/DeclarationsScreen.js";
//import DeclarationsSearchScreen from "../screens/DeclarationsSearchScreen.js";
import DeclarationDetailsScreen from "../screens/DeclarationDetailsScreen.js";
import DestinationMapScreen from "../screens/DestinationMapScreen.js";
import InspectionScreen from "../screens/InspectionScreen.js";
import ReportScreen from "../screens/ReportScreen.js";
import MoreScreen from "../screens/MoreScreen.js";
import AIAnalysisScreen from "../screens/AIAnalysisScreen.js";
import SyncStatusScreen from "../screens/SyncStatusScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen.js";
import ChangePasswordScreen from "../screens/ChangePasswordScreen.js";

const Stack =
    createNativeStackNavigator();





export default function AppNavigator(){


    return (


        <NavigationContainer>


            <Stack.Navigator


                initialRouteName="Login"


                screenOptions={{
                    headerShown:false
                }}


            >
                <Stack.Screen
                    name="ForgotPassword"

                    component={ForgotPasswordScreen}
                />


                <Stack.Screen

                    name="Login"

                    component={LoginScreen}

                />
                <Stack.Screen
                    name="ChangePassword"
                    
                    component={ChangePasswordScreen}
                />

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



            </Stack.Navigator>



        </NavigationContainer>


    );

}