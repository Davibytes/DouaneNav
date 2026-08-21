import { useLanguage } from "../context/LanguageContext.jsx";
import en from "../i18n/en.js";
import fr from "../i18n/fr.js";


const SyncStatusCard = ({ synchronization }) => {
  const { language } = useLanguage();
  const t = language === "FR" ? fr : en;

  return (
    <div className="card">

      <div className="panel-title-row">

        <h3>{t.synchronizationStatus}</h3>

      </div>

      <div className="sync-grid">

        <div>

          <strong>{t.completed}</strong>

          <h2>{synchronization.success}%</h2>

        </div>

        <div>

          <strong>{t.pending}</strong>

          <h2>{synchronization.pending}</h2>

        </div>

        <div>

          <strong>{t.failed}</strong>

          <h2>{synchronization.failed}</h2>

        </div>

      </div>

      <p className="muted">

        {t.lastSynchronization}

      </p>

      <strong>

        {synchronization.lastSync}

      </strong>

    </div>
  );
};

export default SyncStatusCard;
