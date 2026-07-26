const API_URL =
    import.meta.env.VITE_API_URL;


export const getDashboard = async()=>{


    const token =
        localStorage.getItem(
            "douanenav.token"
        );



    const response =
        await fetch(

            `${API_URL}/dashboard`,

            {

                method:"GET",

                headers:{

                    Authorization:
                    `Bearer ${token}`,

                    "Content-Type":
                    "application/json"

                }

            }

        );



    const data =
        await response.json();



    if(!response.ok){

        throw new Error(

            data.error ||
            "Failed to fetch dashboard."

        );

    }



    return data;

};