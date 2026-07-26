import axios from "axios";


const API_URL = "http://YOUR_IP:5000/api";


const getToken = async () => {

    // temporary placeholder
    // later we connect AsyncStorage

    return null;

};



export const getDeclarations = async () => {

    const token = await getToken();


    const response = await axios.get(

        `${API_URL}/declarations`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

};




export const getDeclarationById = async (id) => {


    const token = await getToken();



    const response = await axios.get(

        `${API_URL}/declarations/${id}`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );


    return response.data;

};





export const searchDeclarations = async (query) => {


    const token = await getToken();



    const response = await axios.get(

        `${API_URL}/declarations/search?q=${query}`,

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );



    return response.data;


};