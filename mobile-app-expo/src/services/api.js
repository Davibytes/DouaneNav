import axios from "axios";


const api = axios.create({

    baseURL:
        "http://192.168.137.1:5000/api",

    timeout:15000,

    headers:{
        "Content-Type":"application/json"
    }

});



api.interceptors.request.use(
    request => {

        console.log(
            "API REQUEST:",
            request.baseURL + request.url
        );

        return request;

    },

    error => {

        return Promise.reject(error);

    }
);



api.interceptors.response.use(

    response => {

        console.log(
            "API RESPONSE:",
            response.status,
            response.data
        );

        return response;

    },

    error => {


        console.log(
            "API ERROR:",
            error.message
        );


        if(error.response){

            console.log(
                "SERVER ERROR:",
                error.response.data
            );

        }


        return Promise.reject(error);

    }

);



export default api;