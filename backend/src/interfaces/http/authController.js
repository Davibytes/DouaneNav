const clientIp = (req) => req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
const reply = (res, status, payload) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' }); res.end(JSON.stringify(payload)); };

export const createAuthController = (service) => ({
  login(req, res, credentials) { return reply(res, 200, service.login(credentials, clientIp(req))); },
  logout(req, res) { service.logout(req.headers.authorization, clientIp(req)); return reply(res, 204, {}); },
  me(req, res) { const { user } = service.authenticate(req.headers.authorization); return reply(res, 200, { user }); }
});
