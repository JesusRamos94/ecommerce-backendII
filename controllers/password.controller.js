import { PasswordResetService } from '../services/passwordReset.service.js';
const service = new PasswordResetService();

export class PasswordController {
  async forgot(req, res){
    const { email } = req.body;
    if (!email) throw Object.assign(new Error('Email required'), { status: 400 });
    await service.request(email);
    res.json({ status: 'success', message: 'If the email exists, a reset link was sent.' });
  }
  async reset(req, res){
    const { uid, token, newPassword } = req.body;
    if (!uid || !token || !newPassword) throw Object.assign(new Error('uid, token and newPassword are required'), { status: 400 });
    await service.reset(uid, token, newPassword);
    res.json({ status: 'success', message: 'Password updated' });
  }
}
