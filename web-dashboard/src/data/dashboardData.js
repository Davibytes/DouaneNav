const dashboardData = {
  statistics: [
    {
      title: "Today's Declarations",
      value: 184,
      color: "#2E7D32"
    },
    {
      title: "Pending Inspections",
      value: 18,
      color: "#F9A825"
    },
    {
      title: "Completed Inspections",
      value: 67,
      color: "#1565C0"
    },
    {
      title: "Active Alerts",
      value: 6,
      color: "#C62828"
    },
    {
      title: "Synchronization Queue",
      value: 4,
      color: "#6A1B9A"
    },
    {
      title: "Registered Officers",
      value: 32,
      color: "#00897B"
    }
  ],

  inspections: [
    {
      id: "INS-001",
      declaration: "CM-DLA-2026-004581",
      officer: "Estelle Fongang",
      destination: "Odza",
      result: "Compliant",
      status: "Synced",
      date: "20 Jul 2026"
    },
    {
      id: "INS-002",
      declaration: "CM-DLA-2026-004582",
      officer: "Jean Mbarga",
      destination: "Yaoundé",
      result: "Pending",
      status: "Waiting",
      date: "20 Jul 2026"
    },
    {
      id: "INS-003",
      declaration: "CM-DLA-2026-004583",
      officer: "Marie Ndzi",
      destination: "Douala",
      result: "Compliant",
      status: "Synced",
      date: "19 Jul 2026"
    }
  ],

  alerts: [
    {
      title: "Destination mismatch",
      level: "High",
      message: "Declared destination differs from transport document."
    },
    {
      title: "Missing Driver Information",
      level: "Medium",
      message: "Driver phone number was not provided."
    },
    {
      title: "Synchronization Failed",
      level: "Low",
      message: "One inspection report is waiting for synchronization."
    }
  ],

  synchronization: {
    success: 94,
    pending: 4,
    failed: 1,
    lastSync: "Today - 09:42 AM"
  },

  declarationStatus: [
    {
      status: "Pending",
      value: 42
    },
    {
      status: "Validated",
      value: 108
    },
    {
      status: "Released",
      value: 34
    }
  ]
};

export default dashboardData;