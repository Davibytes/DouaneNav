import api from "../api/axios.js";


export const login = async (
    email,
    password
) => {

    console.log(
    "LOGIN PAYLOAD:",
    {
        email,
        password
    }
);
     console.log("AUTHSERVICE: BEFORE REQUEST");
    const response =
        await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

 console.log("AUTHSERVICE: AFTER REQUEST");
    return response.data;

};





export const logout = async () => {

    const response =
        await api.post(
            "/auth/logout"
        );


    return response.data;

};





export const getCurrentUser = async () => {

    const response =
        await api.get(
            "/auth/me"
        );


    return response.data;

};