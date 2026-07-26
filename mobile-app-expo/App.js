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

import LoginScreen from "./src/screens/LoginScreen.js";
import DashboardScreen from "./src/screens/DashboardScreen.js";
import DeclarationsScreen from "./src/screens/DeclarationsScreen.js";
import DeclarationDetailsScreen from "./src/screens/DeclarationDetailsScreen.js";
import DestinationMapScreen from "./src/screens/DestinationMapScreen.js";
import InspectionScreen from "./src/screens/InspectionScreen.js";

import {
    AuthProvider,
    useAuth
} from "./src/context/AuthContext.js";

import colors from "./src/styles/colors.js";

const Stack = createNativeStackNavigator();

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
                    backgroundColor:colors.background
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

            {/*
            ==========================
            AUTHENTICATION FLOW
            Restore this block later.
            ==========================

            {
                user ? (

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
                    </>

                ) : (

                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />

                )
            }
            */}

            {/* DEMO MODE FOR SCREENSHOTS */}

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

        </Stack.Navigator>

    );

}

export default function App(){

    return (

        <AuthProvider>

            <NavigationContainer>

                <AppNavigator />

            </NavigationContainer>

        </AuthProvider>

    );

}