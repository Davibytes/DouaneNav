import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url');
const sign = (content, secret) => createHmac('sha256', secret).update(content).digest('base64url');

export const createToken = (claims, secret, expiresInSeconds = 8 * 60 * 60) => {
  const now = Math.floor(Date.now() / 1000);
  const header = encode({ alg: 'HS256', typ: 'JWT' });
  const payload = encode({ ...claims, iat: now, exp: now + expiresInSeconds, jti: randomUUID() });
  return `${header}.${payload}.${sign(`${header}.${payload}`, secret)}`;
};

export const verifyToken = (token, secret) => {
  const [header, payload, signature] = String(token).split('.');
  if (!header || !payload || !signature) throw new Error('Invalid authentication token.');
  const expected = sign(`${header}.${payload}`, secret);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) throw new Error('Invalid authentication token.');
  const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
  if (!claims.exp || claims.exp <= Math.floor(Date.now() / 1000)) throw new Error('Authentication token has expired.');
  return claims;
};
