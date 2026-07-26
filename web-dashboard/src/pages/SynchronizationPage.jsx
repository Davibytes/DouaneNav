import {
    useEffect,
    useState
} from "react";


const API_URL =
    "http://localhost:5000/api";



const SynchronizationPage = ()=>{


    const [
        status,
        setStatus
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(false);





    const token =
        localStorage.getItem(
            "douanenav.token"
        );





    useEffect(()=>{

        loadStatus();

    },[]);





    const loadStatus = async()=>{


        try{


            const response =
                await fetch(

                    `${API_URL}/synchronization/status`,

                    {

                        headers:{

                            Authorization:
                            `Bearer ${token}`

                        }

                    }

                );



            const data =
                await response.json();



            setStatus(data);


        }

        catch(error){


            console.log(
                error.message
            );


        }


    };







    const synchronize = async()=>{


        try{


            setLoading(true);



            await fetch(

                `${API_URL}/synchronization`,

                {

                    method:"POST",

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );



            await loadStatus();


        }

        catch(error){


            console.log(
                error.message
            );


        }

        finally{


            setLoading(false);


        }


    };







    return (


        <div>


            <div className="card">


                <h2>
                    Synchronization
                </h2>



                <p className="muted">
                    CAMCIS synchronization status.
                </p>




                {
                    status && (

                        <div>


                            <p>
                                Status:
                                {" "}
                                {status.status}
                            </p>



                            <p>
                                System:
                                {" "}
                                {status.system}
                            </p>



                            <p>
                                Message:
                                {" "}
                                {status.message}
                            </p>



                            <p>
                                Last Sync:
                                {" "}
                                {
                                    new Date(
                                        status.createdAt
                                    )
                                    .toLocaleString()
                                }
                            </p>


                        </div>

                    )
                }





                <button

                    className="button"

                    onClick={
                        synchronize
                    }

                    disabled={
                        loading
                    }

                >

                    {
                        loading
                        ?
                        "Synchronizing..."
                        :
                        "Synchronize Now"
                    }


                </button>



            </div>


        </div>


    );


};


export default SynchronizationPage;