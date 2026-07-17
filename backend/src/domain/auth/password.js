import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const hashPassword = (password, salt = randomBytes(16).toString('hex')) =>
  `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;

export const verifyPassword = (password, storedHash) => {
  const [salt, hash] = storedHash.split(':');
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(hash, 'hex'));
};
