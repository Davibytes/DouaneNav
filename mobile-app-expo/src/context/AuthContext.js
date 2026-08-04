import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    login as loginRequest,
    getCurrentUser,
    logout as logoutRequest
} from "../services/authService.js";

import {
    setAuthToken
} from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {

    const [
        user,
        setUser
    ] = useState(null);

    const [
        loading,
        setLoading
    ] = useState(false);

    const [
        authChecking,
        setAuthChecking
    ] = useState(true);

    // Restore previous session when the app starts
    useEffect(() => {

        restoreSession();

    }, []);

    const restoreSession = async () => {

        try {

            const token =
                await AsyncStorage.getItem(
                    "token"
                );

            if (token) {

                setAuthToken(
                    token
                );

                const response =
                    await getCurrentUser();

                setUser(
                    response.user
                );

            }

        }
        catch (error) {

            await AsyncStorage.removeItem(
                "token"
            );

            setAuthToken(null);

            setUser(null);

        }
        finally {

            setAuthChecking(false);

        }

    };

    const login = async (
        email,
        password
    ) => {

        setLoading(true);

        try {

            const data =
                await loginRequest(
                    email,
                    password
                );

            await AsyncStorage.setItem(
                "token",
                data.token
            );

            setAuthToken(
                data.token
            );

            setUser(
                data.user
            );

            return data;

        }
        finally {

            setLoading(false);

        }

    };

    const logout = async () => {

        try {

            await logoutRequest();

        }
        catch (error) {

            console.log(
                "Logout error:",
                error.message
            );

        }

        await AsyncStorage.removeItem(
            "token"
        );

        setAuthToken(null);

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                authChecking,

                login,

                logout,

                setUser

            }}

        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => {

    return useContext(
        AuthContext
    );

};