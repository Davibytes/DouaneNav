import {
    useEffect,
    useState
} from "react";


import {
    getDashboard
} from "../api/dashboardApi";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const StatisticsPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        statistics,
        setStatistics
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    useEffect(() => {

        loadStatistics();

    }, []);


    const loadStatistics =
        async () => {

            try {

                const data =
                    await getDashboard();


                setStatistics(
                    data
                );

            }

            catch (error) {

                console.log(
                    "Statistics error:",
                    error.message
                );

            }

            finally {

                setLoading(false);

            }

        };


    if (loading) {

        return (

            <div className="card">

                <p>
                    {t.loading}
                </p>

            </div>

        );

    }


    return (

        <div>

            <section className="stats-grid">

                <div className="card stat-card">

                    <p className="card-label">
                        {t["today'sDeclarations"]}
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
                        {t.totalInspections}
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
                        {t.completedInspections}
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
                        {t.pendingSynchronizations}
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
                    {t.destinationStatistics}
                </h3>


                {
                    statistics?.destinationStats?.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="progress-row"
                            >

                                <span>
                                    {item.city}
                                </span>


                                <div
                                    className="progress-bar"
                                >

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
                    {t.inspectionStatistics}
                </h3>


                <p>

                    {t.total}:
                    {" "}

                    {
                        statistics
                            ?.inspectionStatistics
                            ?.total
                        ??
                        0
                    }

                </p>


                <p>

                    {t.completed}:
                    {" "}

                    {
                        statistics
                            ?.inspectionStatistics
                            ?.completed
                        ??
                        0
                    }

                </p>


                <p>

                    {t.pending}:
                    {" "}

                    {
                        statistics
                            ?.inspectionStatistics
                            ?.pending
                        ??
                        0
                    }

                </p>

            </section>

        </div>

    );

};


export default StatisticsPage;