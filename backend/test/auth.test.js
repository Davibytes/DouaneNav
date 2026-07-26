import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

import { createApp } from '../src/app.js';

import { createToken, verifyToken } from '../src/domain/auth/jwt.js';
import { hashPassword, verifyPassword } from '../src/domain/auth/password.js';
import { ROLES, ROLE_PERMISSIONS } from '../src/domain/auth/roles.js';

import { createDashboardService } from '../src/application/dashboard/dashboardService.js';
import { DashboardRepository } from '../src/infrastructure/persistence/dashboardRepository.js';


let server;
let baseUrl;


test.before(async () => {

  process.env.JWT_SECRET = 'test-secret';


  server = createServer(createApp());


  await new Promise((resolve) => {

    server.listen(0, () => {

      const address = server.address();

      baseUrl = `http://localhost:${address.port}`;

      resolve();

    });

  });

});



test.after(async () => {

  await new Promise((resolve) => {

    server.close(resolve);

  });

});



test('password hashes validate only the original password', () => {

  const hash = hashPassword('correct-password');


  assert.equal(
    verifyPassword('correct-password', hash),
    true
  );


  assert.equal(
    verifyPassword('incorrect-password', hash),
    false
  );

});



test('JWT preserves subject and rejects a changed signature', () => {

  const token = createToken(
    {
      sub: 'user-1',
      role: ROLES.ADMINISTRATOR
    },
    'test-secret',
    60
  );


  assert.equal(
    verifyToken(token, 'test-secret').sub,
    'user-1'
  );


  assert.throws(() =>
    verifyToken(
      `${token}changed`,
      'test-secret'
    )
  );

});



test('all required roles have permissions', () => {

  assert.deepEqual(
    Object.keys(ROLE_PERMISSIONS),
    Object.values(ROLES)
  );

});



test('dashboard returns role-scoped summary data', () => {

  const dashboard =
    createDashboardService(
      new DashboardRepository()
    )
    .getDashboard({
      id: 'user-3',
      role: ROLES.MOBILE_BRIGADE
    });


  assert.equal(
    dashboard.scope,
    ROLES.MOBILE_BRIGADE
  );


  assert.equal(
    dashboard.recentInspections.every(
      (item) => item.officerId === 'user-3'
    ),
    true
  );


  assert.ok(
    dashboard.counts.activeAlerts > 0
  );

});



test('login returns JWT and user information', async () => {

  const response = await fetch(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: 'admin@douanenav.cm',
        password: 'DouaneNav!2026'
      })

    }
  );


  assert.equal(
    response.status,
    200
  );


  const body = await response.json();


  assert.ok(body.token);

  assert.equal(
    body.user.email,
    'admin@douanenav.cm'
  );

});



test('login rejects incorrect password', async () => {

  const response = await fetch(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: 'admin@douanenav.cm',
        password: 'wrong-password'
      })

    }
  );


  assert.equal(
    response.status,
    401
  );

});



test('authenticated user can access /api/auth/me', async () => {


  const loginResponse = await fetch(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: 'admin@douanenav.cm',
        password: 'DouaneNav!2026'
      })

    }
  );


  const loginData =
    await loginResponse.json();



  const response = await fetch(
    `${baseUrl}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${loginData.token}`
      }
    }
  );


  assert.equal(
    response.status,
    200
  );


  const body =
    await response.json();


  assert.equal(
    body.user.id,
    'user-1'
  );

});



test('logout revokes token access', async () => {


  const loginResponse = await fetch(
    `${baseUrl}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email: 'admin@douanenav.cm',
        password: 'DouaneNav!2026'
      })

    }
  );


  const loginData =
    await loginResponse.json();



  const logoutResponse = await fetch(
    `${baseUrl}/api/auth/logout`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${loginData.token}`
      }
    }
  );


  assert.equal(
    logoutResponse.status,
    204
  );



  const meResponse = await fetch(
    `${baseUrl}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${loginData.token}`
      }
    }
  );


  assert.equal(
    meResponse.status,
    401
  );

});