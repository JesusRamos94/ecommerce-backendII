import { UserRepository } from '../repositories/user.repository.js';
const users = new UserRepository();

export class UserService {
  async getById(id){ return users.findById(id); }
  async delete(id){ return users.deleteById(id); }
  async touchLastConnection(id){ return users.updateLastConnection(id, new Date()); }
}
