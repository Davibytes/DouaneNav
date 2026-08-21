import { useLanguage } from "../context/LanguageContext.jsx";
import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const AlertCard = ({ alerts }) => {

  const { language } = useLanguage();
  const t = language === "FR" ? fr : en;

  return (
    <div className="card">

      <div className="panel-title-row">

        <h3>{t.activeAlerts}</h3>

      </div>

      <div className="alert-list">

        {alerts.map((alert, index) => (

          <div
            className="alert-item"
            key={index}
          >

            <h4>{alert.title}</h4>

            <span className="alert-level">

              {alert.level}

            </span>

            <p>{alert.message}</p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AlertCard;
