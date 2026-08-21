import api from "./axios.js";



export const getDeclarations = async () => {

    const response = await api.get(
        "/declarations"
    );


    return response.data;

};




export const getDeclarationById = async (id) => {


    const response = await api.get(
        `/declarations/${id}`
    );


    return response.data;

};





export const searchDeclarations = async (query) => {


    const response = await api.get(
        "/declarations/search",
        {
            params: {
                q: query
            }
        }
    );



    return response.data;


};
