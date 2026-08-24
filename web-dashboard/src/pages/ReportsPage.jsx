import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import en from "../i18n/en.js";
import fr from "../i18n/fr.js";

const API_URL = "https://douanenav-backend.onrender.com/api";
const fallback = (value, empty) => value === undefined || value === null || value === "" ? empty : value;
const officerName = (report) => report.officerName || report.officer || report.user?.name || report.userName;
const officerAccount = (report) => report.officerId || report.userId || report.user?.id || report.user?.email || report.officerEmail || report.userEmail;
const destination = (report) => {
    const direct = report.destination;
    if (typeof direct === "string") return direct;
    if (direct && typeof direct === "object") return direct.address || direct.city || direct.area || direct.name;
    return report.location || report.declaration?.destination?.address || report.declaration?.destination?.city || report.declaration?.destination?.area;
};
const formatDate = (value, empty) => !value || Number.isNaN(new Date(value).getTime()) ? empty : new Date(value).toLocaleString();

const photoSource = (photo) => {
    if (typeof photo === "string") return photo;
    const source = photo?.url || photo?.uri || photo?.data || photo?.base64;
    if (!source) return null;
    return source.startsWith("data:") || /^https?:\/\//i.test(source) ? source : `data:image/jpeg;base64,${source}`;
};

const inspectionType = (report, t) => {
    const type = report.inspectionType || report.inspection?.inspectionType;
    if (type === "initial" || report.isReinspection === false) return t.initialInspection;
    if (type === "reinspection" || report.isReinspection === true) return t.reinspection;
    return t.notAvailable;
};

const ReportDetails = ({ report, t, onPhoto }) => {
    const photos = Array.isArray(report.photos) ? report.photos.map(photoSource).filter(Boolean) : [];
    const rows = [
        [t.declaration, report.declarationNumber || report.declaration?.declarationNumber],
        [t.officer, officerName(report)], [t.account, officerAccount(report)],
        [t.inspectionType, inspectionType(report, t)], [t.status, report.status],
        [t.result, report.result], [t.destination, destination(report)], [t.location, report.location],
        [t.date, formatDate(report.createdAt || report.completedAt, t.notAvailable)],
        [t.findings, report.comments || report.findings],
        [t.inspectionId, report.inspectionId || report.inspection?._id || report.inspection?.id],
        [t.reportId, report._id || report.id],
        [t.inspectionCount, report.inspectionCount || report.inspectionNumber]
    ];
    return <>
        <dl style={detailGridStyle}>
            {rows.map(([label, value]) => <div key={label} style={{ display:"contents" }}>
                <dt style={{ fontWeight:700 }}>{label}</dt>
                <dd style={{ margin:0, whiteSpace:"pre-wrap" }}>{fallback(value, t.notAvailable)}</dd>
            </div>)}
        </dl>
        <div style={{ marginTop:"20px" }}>
            <strong>{t.evidence}</strong>
            {photos.length === 0 ? <p className="muted">{t.noPhotos}</p> : <div style={photosStyle}>
                {photos.map((photo, index) => <button key={`${index}-${photo}`} type="button" onClick={() => onPhoto(photo)} style={imageButtonStyle}>
                    <img src={photo} alt={`${t.evidence} ${index + 1}`} style={detailImageStyle} />
                </button>)}
                <span className="muted">{photos.length} {t.photos}</span>
            </div>}
        </div>
    </>;
};

const ReportsPage = () => {
    const { language } = useLanguage();
    const t = language === "FR" ? fr : en;
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const token = localStorage.getItem("douanenav.token");

    useEffect(() => {
        const loadReports = async () => {
            try {
                setLoading(true); setError("");
                const response = await fetch(`${API_URL}/reports`, { headers:{ Authorization:`Bearer ${token}`, "X-Client-Platform":"web", "Content-Type":"application/json" } });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || t.reportsUnavailable);
                setReports(Array.isArray(data) ? data : []);
            } catch (requestError) {
                console.log("Reports error:", requestError.message);
                setError(requestError.message); setReports([]);
            } finally { setLoading(false); }
        };
        loadReports();
    }, [token, t.reportsUnavailable]);

    const filteredReports = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return reports;
        return reports.filter((report) => [report.declarationNumber, report.declaration?.declarationNumber, officerName(report), report.officerEmail, report.userEmail, report.user?.email, destination(report), report.status]
            .some((value) => String(value || "").toLowerCase().includes(query)));
    }, [reports, search]);

    const completed = reports.filter((report) => ["completed", "submitted", "synced"].includes(String(report.status || "").toLowerCase())).length;
    const pending = reports.filter((report) => ["pending", "in progress"].includes(String(report.status || "").toLowerCase())).length;
    const monthly = reports.filter((report) => {
        const date = new Date(report.createdAt); const now = new Date();
        return !Number.isNaN(date.getTime()) && date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    }).length;

    if (loading) return <div className="card"><p>{t.loading}</p></div>;

    return <div>
        <section className="stats-grid">
            {[[t.totalReports, reports.length], [t.completedInspections, completed], [t.pendingReports, pending], [t.monthlyReports, monthly]].map(([label, total]) => <div className="card stat-card" key={label}><p className="card-label">{label}</p><h2>{total}</h2></div>)}
        </section>
        {error && <div className="card"><h3>{t.reportsUnavailable}</h3><p className="muted">{error}</p></div>}
        <section className="card">
            <h3>{t.operationalReports}</h3><p className="muted">{t.reportsDescription}</p>
            <div className="search-bar" style={{ margin:"18px 0" }}><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.searchReports} aria-label={t.searchReports} /></div>
            {reports.length === 0 ? <p className="muted">{t.noInspectionReports}</p> : filteredReports.length === 0 ? <p className="muted">{t.noMatchingReports}</p> : <div style={{ overflowX:"auto" }}>
                <table className="inspection-table"><thead><tr>
                    <th>{t.declaration}</th><th>{t.officer}</th><th>{t.account}</th><th>{t.destination}</th><th>{t.inspectionType}</th><th>{t.result}</th><th>{t.status}</th><th>{t.date}</th><th>{t.evidence}</th>
                </tr></thead><tbody>{filteredReports.map((report, index) => {
                    const photos = Array.isArray(report.photos) ? report.photos.map(photoSource).filter(Boolean) : [];
                    const isCompleted = String(report.status || "").toLowerCase() === "completed";
                    return <tr key={report._id || report.id || index} onClick={() => setSelectedReport(report)} style={{ cursor:"pointer" }}>
                        <td>{fallback(report.declarationNumber || report.declaration?.declarationNumber, t.notAvailable)}</td>
                        <td>{fallback(officerName(report), t.notAvailable)}</td><td>{fallback(officerAccount(report), t.notAvailable)}</td>
                        <td>{fallback(destination(report), t.notAvailable)}</td><td>{inspectionType(report, t)}</td>
                        <td>{fallback(report.result, t.notAvailable)}</td><td><span className={`status ${isCompleted ? "success" : "pending"}`}>{fallback(report.status, t.unknown)}</span></td>
                        <td>{formatDate(report.createdAt || report.completedAt, t.notAvailable)}</td>
                        <td>{photos.length === 0 ? <span className="muted">{t.noPhotos}</span> : <div style={photosStyle}>{photos.map((photo, photoIndex) => <button key={`${photoIndex}-${photo}`} type="button" onClick={(event) => { event.stopPropagation(); setSelectedPhoto(photo); }} title={t.viewPhoto} style={imageButtonStyle}><img src={photo} alt={`${t.evidence} ${photoIndex + 1}`} style={thumbnailStyle} /></button>)}<span className="muted">{photos.length} {t.photos}</span></div>}</td>
                    </tr>;
                })}</tbody></table>
            </div>}
        </section>
        {selectedReport && <div onClick={() => setSelectedReport(null)} style={overlayStyle}><section onClick={(event) => event.stopPropagation()} className="card" style={detailModalStyle}><button type="button" onClick={() => setSelectedReport(null)} style={closeStyle}>{t.close}</button><h3>{t.reportDetails}</h3><ReportDetails report={selectedReport} t={t} onPhoto={setSelectedPhoto} /></section></div>}
        {selectedPhoto && <div onClick={() => setSelectedPhoto(null)} style={overlayStyle}><div onClick={(event) => event.stopPropagation()} style={photoModalStyle}><button type="button" onClick={() => setSelectedPhoto(null)} style={closeStyle}>{t.close}</button><img src={selectedPhoto} alt={t.evidence} style={previewStyle} /></div></div>}
    </div>;
};

const photosStyle = { display:"flex", gap:"8px", alignItems:"center", flexWrap:"wrap" };
const imageButtonStyle = { border:"none", padding:0, background:"transparent", cursor:"pointer" };
const thumbnailStyle = { width:"64px", height:"64px", objectFit:"cover", borderRadius:"8px", border:"1px solid #ddd" };
const detailImageStyle = { width:"110px", height:"90px", objectFit:"cover", borderRadius:"8px" };
const overlayStyle = { position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:9999, padding:"30px", cursor:"pointer" };
const detailModalStyle = { width:"min(760px, 92vw)", maxHeight:"88vh", overflowY:"auto", margin:0, cursor:"default", position:"relative" };
const photoModalStyle = { maxWidth:"90vw", maxHeight:"90vh", background:"#fff", padding:"15px", borderRadius:"12px", cursor:"default", position:"relative" };
const previewStyle = { display:"block", maxWidth:"80vw", maxHeight:"80vh", objectFit:"contain" };
const closeStyle = { float:"right", padding:"7px 12px", marginLeft:"12px" };
const detailGridStyle = { display:"grid", gridTemplateColumns:"minmax(130px, 180px) 1fr", gap:"10px 16px", marginTop:"18px" };

export default ReportsPage;
