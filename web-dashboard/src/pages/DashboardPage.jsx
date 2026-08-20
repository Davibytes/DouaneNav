import {
    useEffect,
    useState
} from "react";


import StatCard from "../components/StatCard.jsx";
import InspectionTable from "../components/InspectionTable.jsx";
import AlertCard from "../components/AlertCard.jsx";
import SyncStatusCard from "../components/SyncStatusCard.jsx";


import {
    getDashboard
} from "../api/dashboardApi.js";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const DashboardPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        dashboard,
        setDashboard
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");


            const data =
                await getDashboard();


            setDashboard(
                data
            );

        }

        catch (error) {

            console.log(
                "Dashboard error:",
                error.message
            );


            setError(
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


    if (error) {

        return (

            <div className="card">

                <h3>
                    {t.dashboard} — {t.error}
                </h3>


                <p className="muted">
                    {error}
                </p>

            </div>

        );

    }


    return (

        <>

            <section className="stats-grid">

                <StatCard

                    title={
                        t["today'sDeclarations"]
                    }

                    value={
                        dashboard?.counts?.todayDeclarations
                        ??
                        0
                    }

                />


                <StatCard

                    title={
                        t.pendingInspections
                    }

                    value={
                        dashboard?.counts?.pendingInspections
                        ??
                        0
                    }

                />


                <StatCard

                    title={
                        t.completedInspections
                    }

                    value={
                        dashboard?.counts?.completedInspections
                        ??
                        0
                    }

                />


                <StatCard

                    title={
                        t.pendingSynchronizations
                    }

                    value={
                        dashboard?.counts?.pendingSynchronizations
                        ??
                        0
                    }

                />

            </section>


            <section className="dashboard-row">

                <div className="dashboard-left">

                    <InspectionTable

                        inspections={
                            dashboard?.recentInspections
                            ??
                            []
                        }

                    />

                </div>


                <div className="dashboard-right">

                    <AlertCard

                        alerts={
                            dashboard?.alerts
                            ??
                            []
                        }

                    />

                </div>

            </section>


            <section className="dashboard-row">

                <div className="dashboard-left">

                    <SyncStatusCard

                        synchronization={
                            dashboard?.synchronization
                            ??
                            {}
                        }

                    />

                </div>


                <div className="dashboard-right">

                    <div className="card">

                        <h3>
                            {t.declarationStatistics}
                        </h3>


                        {
                            dashboard?.declarationStatus?.map(
                                (
                                    item,
                                    index
                                ) => (

                                    <div
                                        key={index}
                                        className="progress-row"
                                    >

                                        <span>
                                            {
                                                item.status
                                            }
                                        </span>


                                        <div
                                            className="progress-bar"
                                        >

                                            <span
                                                style={{
                                                    width:
                                                        `${item.value}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                )
                            )
                        }

                    </div>

                </div>

            </section>

        </>

    );

};


export default DashboardPage;