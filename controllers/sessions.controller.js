import { AuthService } from '../services/auth.service.js';
import { UserService } from '../services/user.service.js';
import { signToken } from '../utils/jwt.util.js';
import { toUserDTO } from '../dtos/user.dto.js';

const auth = new AuthService();
const users = new UserService();

export class SessionsController {
  async register(req, res){
    const { first_name, last_name, email, age, password, role } = req.body;
    if (!password) throw Object.assign(new Error('Password is required'), { status: 400 });
    const user = await auth.register({ first_name, last_name, email, age, password, role });
    const token = signToken(user);
    const cookieName = process.env.JWT_COOKIE_NAME || 'jwt';
    res.cookie(cookieName, token, { httpOnly: true, sameSite: 'lax' });
    const dto = toUserDTO(user);
    res.status(201).json({ status: 'success', payload: dto });
  }

  async login(req, res){
    const { email, password } = req.body;
    const user = await auth.validateCredentials(email, password);
    await users.touchLastConnection(user._id || user.id);
    const token = signToken(user);
    const cookieName = process.env.JWT_COOKIE_NAME || 'jwt';
    res.cookie(cookieName, token, { httpOnly: true, sameSite: 'lax' })
       .json({ status: 'success', payload: toUserDTO(user) });
  }

  async current(req, res){
    res.json({ status: 'success', payload: toUserDTO(req.user) });
  }

  async logout(req, res){
    const cookieName = process.env.JWT_COOKIE_NAME || 'jwt';
    res.clearCookie(cookieName, { httpOnly: true, sameSite: 'lax' }).json({ status: 'success', message: 'Logged out' });
  }
}
