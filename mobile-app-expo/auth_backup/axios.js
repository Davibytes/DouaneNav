import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


let authToken = null;


const api = axios.create({

    baseURL:
        "http://192.168.137.1:5000/api",

    timeout:15000,

    headers:{
        "Content-Type":"application/json"
    }

});


export const setAuthToken = (token)=>{

    authToken = token;

};



api.interceptors.request.use(

    async(request)=>{


        const token =
            authToken ||
            await AsyncStorage.getItem(
                "token"
            );


        if(token){

            request.headers.Authorization =
                `Bearer ${token}`;

        }


        console.log(
            "API REQUEST:",
            request.baseURL + request.url
        );


        return request;

    },


    error=>{

        return Promise.reject(error);

    }

);



api.interceptors.response.use(

    response=>{


        console.log(
            "API RESPONSE:",
            response.status
        );


        return response;

    },


    error=>{


        console.log(
            "API ERROR:",
            error.message
        );


        return Promise.reject(error);

    }

);



export default api;