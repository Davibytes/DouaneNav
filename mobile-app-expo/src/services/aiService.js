import api from "../api/axios.js";


export const runAIAnalysis = async (
    data
)=>{

    const response =
        await api.post(
            "/ai-analysis",
            data
        );


    return response.data;

};