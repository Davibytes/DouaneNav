import { createAuthController } from './interfaces/http/authController.js';
import { createAuthService } from './application/auth/authService.js';
import { JsonAuthRepository } from './infrastructure/persistence/jsonAuthRepository.js';
import { DashboardRepository } from './infrastructure/persistence/dashboardRepository.js';
import { createDashboardService } from './application/dashboard/dashboardService.js';
import { createDashboardController } from './interfaces/http/dashboardController.js';

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
};

const readBody = async (req) => {
  let value = '';
  for await (const chunk of req) {
    value += chunk;
    if (value.length > 100_000) throw new Error('Request body is too large.');
  }
  if (!value) return {};
  try { return JSON.parse(value); } catch { throw new Error('Request body must be valid JSON.'); }
};

export const createApp = () => {
  const repository = new JsonAuthRepository();
  const authService = createAuthService(repository, process.env.JWT_SECRET);
  const auth = createAuthController(authService);
  const dashboard = createDashboardController(authService, createDashboardService(new DashboardRepository()));

  return async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') return res.writeHead(204).end();
    try {
      if (req.method === 'GET' && req.url === '/api/health') return json(res, 200, { status: 'ok', module: 'authentication' });
      if (req.method === 'POST' && req.url === '/api/auth/login') return auth.login(req, res, await readBody(req));
      if (req.method === 'POST' && req.url === '/api/auth/logout') return auth.logout(req, res);
      if (req.method === 'GET' && req.url === '/api/auth/me') return auth.me(req, res);
      if (req.method === 'GET' && req.url === '/api/dashboard') return dashboard.get(req, res);
      return json(res, 404, { error: 'Route not found.' });
    } catch (error) {
      const status = error.statusCode || 400;
      return json(res, status, { error: error.message || 'Unexpected server error.' });
    }
  };
};
