import api from "./api.js";


export const getSyncStatus = async()=>{

    try{

        const response =
            await api.get(
                "/synchronization/status"
            );


        return response.data;

    }
    catch(error){

        console.log(
            "Sync status error:",
            error.message
        );

        throw error;

    }

};



export const synchronize = async()=>{

    try{

        const response =
            await api.post(
                "/synchronization"
            );


        return response.data;

    }
    catch(error){

        console.log(
            "Synchronization error:",
            error.message
        );

        throw error;

    }

};