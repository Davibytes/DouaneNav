import {
    useEffect,
    useState
} from "react";



const API_URL =
    "http://localhost:5000/api";



const AuditLogsPage = ()=>{


    const [
        logs,
        setLogs
    ] = useState([]);



    const [
        loading,
        setLoading
    ] = useState(true);



    const token =
        localStorage.getItem(
            "douanenav.token"
        );






    useEffect(()=>{

        loadLogs();

    },[]);






    const loadLogs = async()=>{


        try{


            const response =
                await fetch(

                    `${API_URL}/audit-logs`,

                    {

                        headers:{

                            Authorization:
                            `Bearer ${token}`

                        }

                    }

                );



            const data =
                await response.json();



            setLogs(
                data
            );


        }

        catch(error){


            console.log(
                "Audit logs error:",
                error.message
            );


            setLogs([]);

        }


        finally{


            setLoading(false);


        }


    };







    return (


        <div>


            <div className="card">


                <h2>
                    Audit Logs
                </h2>


                <p className="muted">
                    System activity tracking.
                </p>


            </div>






            <div className="card">


                {
                    loading ?


                    <p>
                        Loading audit logs...
                    </p>


                    :



                    <table className="inspection-table">


                        <thead>


                            <tr>


                                <th>
                                    Action
                                </th>


                                <th>
                                    User
                                </th>


                                <th>
                                    Date
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            {
                                logs.length === 0 && (

                                    <tr>

                                        <td colSpan="3">

                                            No audit logs found.

                                        </td>

                                    </tr>

                                )
                            }






                            {
                                logs.map(

                                    (log,index)=>(


                                        <tr

                                            key={
                                                log._id ||
                                                index
                                            }

                                        >


                                            <td>

                                                {
                                                    log.action
                                                }

                                            </td>




                                            <td>

                                                {
                                                    log.user ||
                                                    log.userEmail ||
                                                    "System"
                                                }

                                            </td>




                                            <td>

                                                {
                                                    new Date(
                                                        log.createdAt ||
                                                        log.date
                                                    )
                                                    .toLocaleString()
                                                }

                                            </td>




                                        </tr>


                                    )

                                )
                            }



                        </tbody>



                    </table>


                }


            </div>


        </div>


    );


};



export default AuditLogsPage;