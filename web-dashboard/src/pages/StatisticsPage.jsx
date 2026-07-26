import {
    useEffect,
    useState
} from "react";


import {
    getDashboard
} from "../api/dashboardApi";



const StatisticsPage = () => {


    const [
        statistics,
        setStatistics
    ] = useState(null);



    const [
        loading,
        setLoading
    ] = useState(true);





    useEffect(()=>{

        loadStatistics();

    },[]);







    const loadStatistics = async()=>{


        try{


            const data =
                await getDashboard();



            setStatistics(data);



        }

        catch(error){


            console.log(
                "Statistics error:",
                error.message
            );


        }

        finally{


            setLoading(false);


        }


    };







    if(loading){

        return (

            <div className="card">

                <p>
                    Loading statistics...
                </p>

            </div>

        );

    }








    return (

        <div>






            <section className="stats-grid">






                <div className="card stat-card">


                    <p className="card-label">

                        Today's Declarations

                    </p>



                    <h2>

                        {
                            statistics?.counts?.todayDeclarations
                            ??
                            0
                        }

                    </h2>


                </div>









                <div className="card stat-card">


                    <p className="card-label">

                        Total Inspections

                    </p>



                    <h2>

                        {
                            statistics?.inspectionStatistics?.total
                            ??
                            0
                        }

                    </h2>


                </div>









                <div className="card stat-card">


                    <p className="card-label">

                        Completed Inspections

                    </p>



                    <h2>

                        {
                            statistics?.inspectionStatistics?.completed
                            ??
                            0
                        }

                    </h2>


                </div>









                <div className="card stat-card">


                    <p className="card-label">

                        Pending Synchronizations

                    </p>



                    <h2>

                        {
                            statistics?.counts?.pendingSynchronizations
                            ??
                            0
                        }

                    </h2>


                </div>





            </section>









            <section className="card">


                <h3>
                    Destination Statistics
                </h3>





                {
                    statistics?.destinationStats?.map(

                        (item,index)=>(


                            <div

                                key={index}

                                className="progress-row"

                            >



                                <span>

                                    {item.city}

                                </span>





                                <div className="progress-bar">


                                    <span

                                        style={{

                                            width:
                                            `${item.total}%`

                                        }}

                                    />

                                </div>





                                <span>

                                    {item.total}

                                </span>




                            </div>


                        )

                    )
                }





            </section>









            <section className="card">


                <h3>
                    Inspection Statistics
                </h3>




                <p>

                    Total:
                    {" "}
                    {
                        statistics?.inspectionStatistics?.total
                        ??
                        0
                    }

                </p>




                <p>

                    Completed:
                    {" "}
                    {
                        statistics?.inspectionStatistics?.completed
                        ??
                        0
                    }

                </p>




                <p>

                    Pending:
                    {" "}
                    {
                        statistics?.inspectionStatistics?.pending
                        ??
                        0
                    }

                </p>




            </section>





        </div>

    );

};



export default StatisticsPage;