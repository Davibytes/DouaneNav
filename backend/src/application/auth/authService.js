import { createToken, verifyToken } from '../../domain/auth/jwt.js';
import { verifyPassword } from '../../domain/auth/password.js';

const unauthorized = (message = 'Invalid email or password.') => Object.assign(new Error(message), { statusCode: 401 });

export const createAuthService = (repository, secret = 'development-secret') => ({
  login({ email, password }, ipAddress) {
    if (!email || !password) throw Object.assign(new Error('Email and password are required.'), { statusCode: 422 });
    const user = repository.findUserByEmail(email.trim().toLowerCase());
    if (!user || !verifyPassword(password, user.passwordHash)) {
      repository.recordAudit({ action: 'login.failed', ipAddress, targetEntity: 'Users' });
      throw unauthorized();
    }
    if (user.status !== 'active') throw unauthorized('This user account is deactivated.');
    const role = repository.findRoleById(user.roleId);
    const token = createToken({ sub: user.id, role: role.name, email: user.email }, secret);
    repository.recordAudit({ userId: user.id, action: 'login', targetEntity: 'Users', targetId: user.id, ipAddress });
    return { token, expiresIn: 8 * 60 * 60, user: repository.publicUser(user, role) };
  },
  authenticate(authorization) {
    if (!authorization?.startsWith('Bearer ')) throw unauthorized('A bearer token is required.');
    let claims;
    try { claims = verifyToken(authorization.slice(7), secret); } catch (error) { throw unauthorized(error.message); }
    if (repository.isTokenRevoked(claims.jti)) throw unauthorized('This session has been signed out.');
    const user = repository.findUserById(claims.sub);
    if (!user || user.status !== 'active') throw unauthorized('This user account is unavailable.');
    return { claims, user: repository.publicUser(user, repository.findRoleById(user.roleId)) };
  },
  logout(authorization, ipAddress) {
    const { claims, user } = this.authenticate(authorization);
    repository.revokeToken(claims.jti, claims.exp);
    repository.recordAudit({ userId: user.id, action: 'logout', targetEntity: 'Users', targetId: user.id, ipAddress });
  }
});
