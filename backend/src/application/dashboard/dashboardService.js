const canSeeOperationalData = new Set(['Administrator', 'Customs Officer', 'Mobile Brigade', 'Supervisor']);

export const createDashboardService = (repository) => ({
  getDashboard(user) {
    if (!canSeeOperationalData.has(user.role)) throw Object.assign(new Error('You are not authorized to view the dashboard.'), { statusCode: 403 });
    const data = repository.getDashboardData();
    const today = new Date().toISOString().slice(0, 10);
    const allInspections = data.inspections;
    const ownInspections = user.role === 'Mobile Brigade' || user.role === 'Customs Officer'
      ? allInspections.filter((item) => item.officerId === user.id) : allInspections;
    const visibleRecent = (user.role === 'Mobile Brigade' || user.role === 'Customs Officer' ? ownInspections : allInspections)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);
    const counts = {
      todayDeclarations: data.declarations.filter((item) => item.createdAt.startsWith(today)).length,
      pendingInspections: data.declarations.filter((item) => item.status === 'pending').length,
      completedInspections: ownInspections.filter((item) => item.status === 'submitted' || item.status === 'synced').length,
      pendingSynchronizations: data.synchronizationLogs.filter((item) => item.status === 'pending' || item.status === 'processing').length,
      activeAlerts: data.alerts.filter((item) => item.status === 'active').length
    };
    if (user.role === 'Administrator') counts.activeUsers = data.activeUserCount;
    return {
      generatedAt: new Date().toISOString(),
      scope: user.role,
      counts,
      alerts: data.alerts.filter((item) => item.status === 'active').slice(0, 4),
      recentInspections: visibleRecent,
      synchronization: data.synchronizationLogs.sort((a, b) => b.attemptedAt.localeCompare(a.attemptedAt)).slice(0, 4)
    };
  }
});
