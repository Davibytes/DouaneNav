import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashPassword } from '../../domain/auth/password.js';
import { ROLE_PERMISSIONS, ROLES } from '../../domain/auth/roles.js';

const directory = dirname(fileURLToPath(import.meta.url));
const dataFile = join(directory, '../../../data/auth.json');
const initialData = () => {
  const roles = Object.values(ROLES).map((name, index) => ({ id: `role-${index + 1}`, name, permissions: ROLE_PERMISSIONS[name] }));
  const makeUser = (id, name, email, roleId) => ({ id, name, email, roleId, phone: '', status: 'active', passwordHash: hashPassword('DouaneNav!2026'), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return { roles, users: [
    makeUser('user-1', 'Amina Ndzi', 'admin@douanenav.cm', 'role-1'),
    makeUser('user-2', 'Jean Mbarga', 'officer@douanenav.cm', 'role-2'),
    makeUser('user-3', 'Estelle Fongang', 'brigade@douanenav.cm', 'role-3'),
    makeUser('user-4', 'Paul Tchana', 'supervisor@douanenav.cm', 'role-4')
  ], auditLogs: [], revokedTokens: [] };
};

export class JsonAuthRepository {
  constructor() {
    mkdirSync(dirname(dataFile), { recursive: true });
    if (!existsSync(dataFile)) writeFileSync(dataFile, JSON.stringify(initialData(), null, 2));
  }
  read() { return JSON.parse(readFileSync(dataFile, 'utf8')); }
  write(data) { writeFileSync(dataFile, JSON.stringify(data, null, 2)); }
  findUserByEmail(email) { return this.read().users.find((user) => user.email === email); }
  findUserById(id) { return this.read().users.find((user) => user.id === id); }
  findRoleById(id) { return this.read().roles.find((role) => role.id === id); }
  publicUser(user, role) { return { id: user.id, name: user.name, email: user.email, phone: user.phone, status: user.status, role: role.name, permissions: role.permissions }; }
  recordAudit(event) { const data = this.read(); data.auditLogs.push({ id: crypto.randomUUID(), timestamp: new Date().toISOString(), ...event }); this.write(data); }
  revokeToken(jti, expiresAt) { const data = this.read(); data.revokedTokens = data.revokedTokens.filter((item) => item.expiresAt > Math.floor(Date.now() / 1000)); data.revokedTokens.push({ jti, expiresAt }); this.write(data); }
  isTokenRevoked(jti) { return this.read().revokedTokens.some((item) => item.jti === jti); }
}
