import test from 'node:test';
import assert from 'node:assert/strict';
import { createToken, verifyToken } from '../src/domain/auth/jwt.js';
import { hashPassword, verifyPassword } from '../src/domain/auth/password.js';
import { ROLES, ROLE_PERMISSIONS } from '../src/domain/auth/roles.js';
import { createDashboardService } from '../src/application/dashboard/dashboardService.js';
import { DashboardRepository } from '../src/infrastructure/persistence/dashboardRepository.js';

test('password hashes validate only the original password', () => {
  const hash = hashPassword('correct-password');
  assert.equal(verifyPassword('correct-password', hash), true);
  assert.equal(verifyPassword('incorrect-password', hash), false);
});

test('JWT preserves subject and rejects a changed signature', () => {
  const token = createToken({ sub: 'user-1', role: ROLES.ADMINISTRATOR }, 'test-secret', 60);
  assert.equal(verifyToken(token, 'test-secret').sub, 'user-1');
  assert.throws(() => verifyToken(`${token}changed`, 'test-secret'));
});

test('all required roles have permissions', () => {
  assert.deepEqual(Object.keys(ROLE_PERMISSIONS), Object.values(ROLES));
});

test('dashboard returns role-scoped summary data', () => {
  const dashboard = createDashboardService(new DashboardRepository()).getDashboard({ id: 'user-3', role: ROLES.MOBILE_BRIGADE });
  assert.equal(dashboard.scope, ROLES.MOBILE_BRIGADE);
  assert.equal(dashboard.recentInspections.every((item) => item.officerId === 'user-3'), true);
  assert.ok(dashboard.counts.activeAlerts > 0);
});
