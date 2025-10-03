import { PasswordResetTokenRepository } from '../repositories/passwordResetToken.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { randomToken, sha256 } from '../utils/token.util.js';
import { sendPasswordResetEmail } from '../utils/mailer.util.js';
import { AuthService } from './auth.service.js';

const tokens = new PasswordResetTokenRepository();
const users = new UserRepository();
const auth = new AuthService();

export class PasswordResetService {
  async request(email) {
    const user = await users.findByEmail(email);
    if (!user) return { ok: true };


    const token = randomToken(32);
    const tokenHash = sha256(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await tokens.create({ user: user._id, tokenHash, expiresAt });
    const base = process.env.APP_BASE_URL || 'http://localhost:3000';
    const link = `${base}/reset-password.html?token=${encodeURIComponent(token)}&uid=${user._id.toString()}`;
    await sendPasswordResetEmail(user.email, link);
    return { ok: true };
  }

  async reset(uid, token, newPassword) {
    const user = await users.findById(uid);
    if (!user) throw Object.assign(new Error('Invalid token'), { status: 400 });

    if (await auth.isSamePassword(user, newPassword)) {
      throw Object.assign(new Error('New password must be different'), { status: 400 });
    }

    const tokenHash = sha256(token);
    const consumed = await tokens.consume(user._id, tokenHash);
    if (!consumed) throw Object.assign(new Error('Invalid or expired token'), { status: 400 });

    await auth.updatePassword(user._id, newPassword);
    return { ok: true };
  }
}
