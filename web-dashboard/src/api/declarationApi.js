const API_URL =
    "https://douanenav-backend.onrender.com/api";


export const getDeclarations = async () => {

    const token =
        localStorage.getItem("douanenav.token");

    const response =
        await fetch(
            `${API_URL}/declarations`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Failed to fetch declarations."
        );

    }


    return data;

};


export const searchDeclarations = async (query) => {

    const token =
        localStorage.getItem("douanenav.token");


    const response =
        await fetch(
            `${API_URL}/declarations/search?q=${encodeURIComponent(query)}`,
            {
                method: "GET",

                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );


    const data =
        await response.json();


    if (!response.ok) {

        throw new Error(
            data.error ||
            "Failed to search declarations."
        );

    }


    return data;

};