import { UserService } from '../services/user.service.js';
import { toUserDTO } from '../dtos/user.dto.js';

const users = new UserService();

export class UsersController {
  async getById(req, res){
    const user = await users.getById(req.params.id);
    if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
    res.json({ status: 'success', payload: toUserDTO(user) });
  }

  async delete(req, res){
    const deleted = await users.delete(req.params.id);
    if (!deleted) throw Object.assign(new Error('User not found'), { status: 404 });
    res.json({ status: 'success', payload: toUserDTO(deleted) });
  }
}
