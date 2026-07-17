export class DashboardRepository {
  getDashboardData() {
    return {
      activeUserCount: 4,
      declarations: [
        { id: 'dec-001', declarationNumber: 'CM-DLA-2026-004581', status: 'pending', createdAt: new Date().toISOString() },
        { id: 'dec-002', declarationNumber: 'CM-DLA-2026-004582', status: 'flagged', createdAt: new Date().toISOString() },
        { id: 'dec-003', declarationNumber: 'CM-DLA-2026-004583', status: 'verified', createdAt: new Date().toISOString() },
        { id: 'dec-004', declarationNumber: 'CM-DLA-2026-004512', status: 'pending', createdAt: '2026-07-15T08:30:00.000Z' }
      ],
      alerts: [
        { id: 'alert-001', severity: 'high', type: 'destinationMismatch', declarationNumber: 'CM-DLA-2026-004582', message: 'Declared destination differs from transport document.', status: 'active', createdAt: '2026-07-16T08:45:00.000Z' },
        { id: 'alert-002', severity: 'medium', type: 'missingInfo', declarationNumber: 'CM-DLA-2026-004581', message: 'Driver contact information is incomplete.', status: 'active', createdAt: '2026-07-16T07:15:00.000Z' }
      ],
      inspections: [
        { id: 'inspection-001', declarationNumber: 'CM-DLA-2026-004570', officerId: 'user-3', officerName: 'Estelle Fongang', result: 'Compliant', status: 'synced', createdAt: '2026-07-16T09:20:00.000Z' },
        { id: 'inspection-002', declarationNumber: 'CM-DLA-2026-004566', officerId: 'user-3', officerName: 'Estelle Fongang', result: 'Needs review', status: 'submitted', createdAt: '2026-07-15T15:10:00.000Z' },
        { id: 'inspection-003', declarationNumber: 'CM-DLA-2026-004564', officerId: 'user-2', officerName: 'Jean Mbarga', result: 'Compliant', status: 'synced', createdAt: '2026-07-15T11:05:00.000Z' }
      ],
      synchronizationLogs: [
        { id: 'sync-001', reportReference: 'INSP-2026-00091', status: 'completed', responseMessage: 'Simulated CAMCIS acknowledgement.', attemptedAt: '2026-07-16T09:22:00.000Z' },
        { id: 'sync-002', reportReference: 'INSP-2026-00092', status: 'processing', responseMessage: 'Awaiting simulated CAMCIS response.', attemptedAt: '2026-07-16T09:16:00.000Z' },
        { id: 'sync-003', reportReference: 'INSP-2026-00088', status: 'pending', responseMessage: 'Queued for next synchronization cycle.', attemptedAt: '2026-07-16T08:50:00.000Z' }
      ]
    };
  }
}
