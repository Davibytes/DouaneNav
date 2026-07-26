const InspectionTable = ({ inspections }) => {
  return (
    <div className="card">

      <div className="panel-title-row">
        <h3>Recent Inspections</h3>
      </div>

      <table className="inspection-table">

        <thead>

          <tr>
            <th>Declaration</th>
            <th>Officer</th>
            <th>Destination</th>
            <th>Result</th>
            <th>Status</th>
            <th>Date</th>
          </tr>

        </thead>

        <tbody>

          {inspections.map((inspection) => (

            <tr key={inspection.id}>

              <td>{inspection.declaration}</td>

              <td>{inspection.officer}</td>

              <td>{inspection.destination}</td>

              <td>{inspection.result}</td>

              <td>

                <span
                  className={
                    inspection.status === "Synced"
                      ? "status success"
                      : "status pending"
                  }
                >
                  {inspection.status}
                </span>

              </td>

              <td>{inspection.date}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default InspectionTable;