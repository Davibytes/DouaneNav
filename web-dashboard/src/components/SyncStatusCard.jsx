const SyncStatusCard = ({ synchronization }) => {
  return (
    <div className="card">

      <div className="panel-title-row">

        <h3>Synchronization Status</h3>

      </div>

      <div className="sync-grid">

        <div>

          <strong>Successful</strong>

          <h2>{synchronization.success}%</h2>

        </div>

        <div>

          <strong>Pending</strong>

          <h2>{synchronization.pending}</h2>

        </div>

        <div>

          <strong>Failed</strong>

          <h2>{synchronization.failed}</h2>

        </div>

      </div>

      <p className="muted">

        Last synchronization

      </p>

      <strong>

        {synchronization.lastSync}

      </strong>

    </div>
  );
};

export default SyncStatusCard;