import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";


let authToken = null;


const API_BASE_URL =
    "https://douanenav-backend.onrender.com/api";


const api = axios.create({

    baseURL:
        API_BASE_URL,

    timeout:
        15000,

    headers: {

        "Content-Type":
            "application/json",

        "X-Client-Platform":
            "mobile"

    }

});


console.log(
    "Using API:",
    API_BASE_URL
);


export const setAuthToken = (
    token
) => {

    authToken =
        token;

};


api.interceptors.request.use(

    async (config) => {

        const token =
            authToken ||
            await AsyncStorage.getItem(
                "token"
            );


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        config.headers[
            "X-Client-Platform"
        ] =
            "mobile";


        console.log(
            "REQUEST:",
            config.method,
            `${config.baseURL}${config.url}`
        );


        console.log(
            "BODY:",
            config.data
        );


        return config;

    },


    error => {

        return Promise.reject(
            error
        );

    }

);


api.interceptors.response.use(

    response => {

        console.log(
            "RESPONSE:",
            response.status
        );


        return response;

    },


    error => {

        console.log(
            "RESPONSE ERROR:",
            error.response?.status
        );


        console.log(
            "ERROR DATA:",
            error.response?.data
        );


        return Promise.reject(
            error
        );

    }

);


export default api;