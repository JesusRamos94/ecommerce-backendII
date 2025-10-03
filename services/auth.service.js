import { UserRepository } from '../repositories/user.repository.js';
import { hash, compare } from '../utils/hash.util.js';

const users = new UserRepository();

export class AuthService {
  async register({ first_name, last_name, email, age, password, role='user' }){
    const exists = await users.findByEmail(email);
    if (exists) throw Object.assign(new Error('Email already in use'), { status: 409 });
    const hashed = await hash(password);
    const user = await users.create({ first_name, last_name, email, age, password: hashed, role });
    return user.toObject ? user.toObject() : user;
  }

  async validateCredentials(email, password){
    const user = await users.findByEmail(email);
    if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    const ok = await compare(password, user.password);
    if (!ok) throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    return user.toObject ? user.toObject() : user;
  }

  async updatePassword(userId, newPassword){
    const hashed = await hash(newPassword);
    return users.updatePassword(userId, hashed);
  }

  async isSamePassword(user, newPlain){
    // Previene reusar la misma contraseña
    return user?.password ? await compare(newPlain, user.password) : false;
  }
}
