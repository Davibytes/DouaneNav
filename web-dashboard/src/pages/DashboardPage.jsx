const DashboardPage = () => {
  const stats = [
    { label: 'Declarations checked', value: '184' },
    { label: 'Pending alerts', value: '12' },
    { label: 'Completed inspections', value: '67' },
  ];

  const alerts = [
    { title: 'Destination mismatch', detail: 'Route differs from declared destination.' },
    { title: 'Vehicle not found', detail: 'Inspection team is rerouting to the last checkpoint.' },
  ];

  const inspections = [
    { id: 'DEC-1042', status: 'Synced', route: 'Douala -> Yaoundé' },
    { id: 'DEC-1048', status: 'Pending', route: 'Ngaoundéré -> Garoua' },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow green">CUSTOMSTRACK AI</p>
          <h1>Operations dashboard</h1>
        </div>
        <div className="header-brand">
          <img src="src/assets/logo.png" alt="CustomsTrack AI logo" className="brand-logo" />
          <span>CustomsTrack AI</span>
        </div>
      </header>

      <section className="stats-grid">
        {stats.map((item) => (
          <article className="card" key={item.label}>
            <p className="card-label">{item.label}</p>
            <h2>{item.value}</h2>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="card panel">
          <div className="panel-title-row">
            <h3>Alerts</h3>
            <span className="pill">Live</span>
          </div>
          <ul className="list">
            {alerts.map((alert) => (
              <li key={alert.title}>
                <strong>{alert.title}</strong>
                <div>{alert.detail}</div>
              </li>
            ))}
          </ul>
        </article>

        <article className="card panel">
          <div className="panel-title-row">
            <h3>Recent inspections</h3>
            <span className="pill">Updated</span>
          </div>
          <ul className="list">
            {inspections.map((item) => (
              <li key={item.id}>
                <strong>{item.id}</strong>
                <div>{item.route}</div>
                <small>{item.status}</small>
              </li>
            ))}
          </ul>
        </article>

        <article className="card panel wide">
          <div className="panel-title-row">
            <h3>Synchronization status</h3>
            <span className="pill">Healthy</span>
          </div>
          <p className="muted">Inspection reports are queued locally and synchronized with the customs system when the connection is available.</p>
          <div className="progress-row">
            <span>Queue</span>
            <div className="progress-bar"><span style={{ width: '78%' }} /></div>
          </div>
          <div className="progress-row">
            <span>Last sync</span>
            <div className="progress-bar"><span style={{ width: '92%' }} /></div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
