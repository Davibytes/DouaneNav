import {
    useEffect,
    useState
} from "react";


import {
    useLanguage
} from "../context/LanguageContext.jsx";


import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const API_URL =
    "https://douanenav-backend.onrender.com/api";


const ReportsPage = () => {

    const {
        language
    } = useLanguage();


    const t =
        language === "FR"
            ? fr
            : en;


    const [
        reports,
        setReports
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState("");


    const [
        selectedPhoto,
        setSelectedPhoto
    ] = useState(null);


    const token =
        localStorage.getItem(
            "douanenav.token"
        );


    useEffect(() => {

        loadReports();

    }, []);


    const loadReports = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await fetch(
                    `${API_URL}/reports`,
                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json"

                        }
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error ||
                    "Failed to load reports."
                );

            }


            setReports(
                Array.isArray(data)
                    ? data
                    : []
            );

        }
        catch (error) {

            console.log(
                "Reports error:",
                error.message
            );


            setError(
                error.message
            );


            setReports([]);

        }
        finally {

            setLoading(false);

        }

    };


    const completedReports =
        reports.filter(
            report =>
                report.status === "Completed" ||
                report.status === "completed"
        );


    const pendingReports =
        reports.filter(
            report =>
                report.status === "Pending" ||
                report.status === "pending"
        );


    const destinations =
        reports
            .map(
                report =>
                    report.location ||
                    report.declaration?.destination?.city
            )
            .filter(Boolean);


    const destinationCounts =
        destinations.reduce(
            (counts, destination) => {

                counts[destination] =
                    (counts[destination] || 0) + 1;

                return counts;

            },
            {}
        );


    const topDestination =
        Object.entries(
            destinationCounts
        )
            .sort(
                (a, b) => b[1] - a[1]
            )[0]?.[0]
        || "N/A";


    const monthlyReports =
        reports.filter(
            report => {

                if (!report.createdAt) {

                    return false;

                }


                const date =
                    new Date(
                        report.createdAt
                    );


                const now =
                    new Date();


                return (

                    date.getFullYear() ===
                    now.getFullYear()

                    &&

                    date.getMonth() ===
                    now.getMonth()

                );

            }
        ).length;


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
                        {t.totalReports}
                    </p>

                    <h2>
                        {reports.length}
                    </h2>

                </div>


                <div className="card stat-card">

                    <p className="card-label">
                        {t.completedInspections}
                    </p>

                    <h2>
                        {completedReports.length}
                    </h2>

                </div>


                <div className="card stat-card">

                    <p className="card-label">
                        {t.pendingReports}
                    </p>

                    <h2>
                        {pendingReports.length}
                    </h2>

                </div>


                <div className="card stat-card">

                    <p className="card-label">
                        {t.monthlyReports}
                    </p>

                    <h2>
                        {monthlyReports}
                    </h2>

                </div>

            </section>


            {
                error && (

                    <div className="card">

                        <h3>
                            {t.reportsUnavailable}
                        </h3>

                        <p className="muted">
                            {error}
                        </p>

                    </div>

                )
            }


            <section className="card">

                <h3>
                    {t.operationalReports}
                </h3>


                <p className="muted">
                    {t.reportsDescription}
                </p>


                {
                    reports.length === 0

                    ?

                    <p className="muted">
                        {t.noInspectionReports}
                    </p>

                    :

                    <div
                        style={{
                            overflowX: "auto"
                        }}
                    >

                        <table
                            className="inspection-table"
                        >

                            <thead>

                                <tr>

                                    <th>
                                        {t.declaration}
                                    </th>

                                    <th>
                                        {t.officer}
                                    </th>

                                    <th>
                                        {t.destination}
                                    </th>

                                    <th>
                                        {t.result}
                                    </th>

                                    <th>
                                        {t.status}
                                    </th>

                                    <th>
                                        {t.date}
                                    </th>

                                    <th>
                                        {t.evidence}
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {
                                    reports.map(
                                        (
                                            report,
                                            index
                                        ) => {

                                            const photos =
                                                Array.isArray(
                                                    report.photos
                                                )
                                                    ? report.photos
                                                    : [];


                                            return (

                                                <tr
                                                    key={
                                                        report._id ||
                                                        report.id ||
                                                        index
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            report.declarationNumber
                                                            ||
                                                            report.declaration?.declarationNumber
                                                            ||
                                                            t.notAvailable
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            report.officer
                                                            ||
                                                            t.notAvailable
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            report.location
                                                            ||
                                                            report.declaration?.destination?.address
                                                            ||
                                                            report.declaration?.destination?.city
                                                            ||
                                                            t.notAvailable
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            report.result
                                                            ||
                                                            report.comments
                                                            ||
                                                            t.notAvailable
                                                        }
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                report.status === "Completed"
                                                                ||
                                                                report.status === "completed"

                                                                    ?

                                                                    "status success"

                                                                    :

                                                                    "status pending"
                                                            }
                                                        >
                                                            {
                                                                report.status
                                                                ||
                                                                t.unknown
                                                            }
                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            report.createdAt

                                                                ?

                                                                new Date(
                                                                    report.createdAt
                                                                ).toLocaleString()

                                                                :

                                                                t.notAvailable
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            photos.length === 0

                                                                ?

                                                                (
                                                                    <span className="muted">
                                                                        {t.noPhotos}
                                                                    </span>
                                                                )

                                                                :

                                                                (
                                                                    <div
                                                                        style={{
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center",
                                                                            flexWrap: "wrap"
                                                                        }}
                                                                    >

                                                                        {
                                                                            photos.map(
                                                                                (
                                                                                    photo,
                                                                                    photoIndex
                                                                                ) => (

                                                                                    <button
                                                                                        key={
                                                                                            photoIndex
                                                                                        }
                                                                                        type="button"
                                                                                        onClick={() =>
                                                                                            setSelectedPhoto(
                                                                                                photo
                                                                                            )
                                                                                        }
                                                                                        style={{
                                                                                            border: "none",
                                                                                            padding: 0,
                                                                                            background: "transparent",
                                                                                            cursor: "pointer"
                                                                                        }}
                                                                                    >

                                                                                        <img
                                                                                            src={
                                                                                                photo
                                                                                            }
                                                                                            alt={`${t.evidence} ${photoIndex + 1}`}
                                                                                            style={{
                                                                                                width: "70px",
                                                                                                height: "70px",
                                                                                                objectFit: "cover",
                                                                                                borderRadius: "8px",
                                                                                                border: "1px solid #ddd"
                                                                                            }}
                                                                                        />

                                                                                    </button>

                                                                                )
                                                                            )
                                                                        }

                                                                    </div>
                                                                )
                                                        }

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )
                                }

                            </tbody>

                        </table>

                    </div>
                }

            </section>


            {
                selectedPhoto && (

                    <div
                        onClick={() =>
                            setSelectedPhoto(
                                null
                            )
                        }
                        style={{
                            position: "fixed",
                            inset: 0,
                            background:
                                "rgba(0,0,0,0.75)",
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "center",
                            zIndex: 9999,
                            padding: "30px",
                            cursor: "pointer"
                        }}
                    >

                        <div
                            onClick={
                                event =>
                                    event.stopPropagation()
                            }
                            style={{
                                maxWidth: "90vw",
                                maxHeight: "90vh",
                                background:
                                    "#fff",
                                padding: "15px",
                                borderRadius:
                                    "12px"
                            }}
                        >

                            <img
                                src={
                                    selectedPhoto
                                }
                                alt={
                                    t.evidence
                                }
                                style={{
                                    display:
                                        "block",
                                    maxWidth:
                                        "80vw",
                                    maxHeight:
                                        "80vh",
                                    objectFit:
                                        "contain"
                                }}
                            />

                        </div>

                    </div>

                )
            }

        </div>

    );

};


export default ReportsPage;