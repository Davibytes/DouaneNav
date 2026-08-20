const InspectionTable = ({ inspections = [] }) => {

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

          {inspections.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center" }}
              >
                No recent inspections.
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
                  {inspection.declarationNumber || "N/A"}
                </td>

                <td>
                  {inspection.officer || "N/A"}
                </td>

                <td>
                  {inspection.location || "N/A"}
                </td>

                <td>
                  {inspection.result ||
                    inspection.comments ||
                    "N/A"}
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
                    {inspection.status || "Unknown"}
                  </span>

                </td>

                <td>
                  {inspection.createdAt
                    ? new Date(
                        inspection.createdAt
                      ).toLocaleDateString()
                    : "N/A"}
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