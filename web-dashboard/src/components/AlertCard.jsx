const AlertCard = ({ alerts }) => {
  return (
    <div className="card">

      <div className="panel-title-row">

        <h3>Active Alerts</h3>

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