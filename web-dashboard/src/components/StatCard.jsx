const StatCard = ({ title, value }) => {

  return (
    <div className="card stat-card">

      <p className="card-label">
        {title}
      </p>

      <h2>
        {value}
      </h2>

    </div>
  );

};

export default StatCard;