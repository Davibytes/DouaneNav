const reply = (res, status, payload) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(payload)); };
export const createDashboardController = (authService, dashboardService) => ({
  get(req, res) { const { user } = authService.authenticate(req.headers.authorization); return reply(res, 200, dashboardService.getDashboard(user)); }
});
