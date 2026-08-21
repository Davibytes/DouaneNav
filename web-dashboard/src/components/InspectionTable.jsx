import { useLanguage } from "../context/LanguageContext.jsx";
import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const InspectionTable = ({ inspections = [] }) => {

  const { language } = useLanguage();
  const t = language === "FR" ? fr : en;

  return (
    <div className="card">

      <div className="panel-title-row">
        <h3>{t.recentInspections}</h3>
      </div>

      <table className="inspection-table">

        <thead>
          <tr>
            <th>{t.declaration}</th>
            <th>{t.officer}</th>
            <th>{t.destination}</th>
            <th>{t.result}</th>
            <th>{t.status}</th>
            <th>{t.date}</th>
          </tr>
        </thead>

        <tbody>

          {inspections.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center" }}
              >
                {t.noRecentInspections}
              </td>
            </tr>

          ) : (

            inspections.map((inspection, index) => (

              <tr
                key={
                  inspection._id ||
                  inspection.id ||
                  index
                }
              >

                <td>
                  {inspection.declarationNumber || t.notAvailable}
                </td>

                <td>
                  {inspection.officer || t.notAvailable}
                </td>

                <td>
                  {inspection.location || t.notAvailable}
                </td>

                <td>
                  {inspection.result ||
                    inspection.comments ||
                    t.notAvailable}
                </td>

                <td>

                  <span
                    className={
                      inspection.status === "Completed" ||
                      inspection.status === "Synced"
                        ? "status success"
                        : "status pending"
                    }
                  >
                    {inspection.status || t.unknown}
                  </span>

                </td>

                <td>
                  {inspection.createdAt
                    ? new Date(
                        inspection.createdAt
                      ).toLocaleDateString()
                    : t.notAvailable}
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default InspectionTable;
