import { UserDAO } from '../daos/user.dao.js';

const dao = new UserDAO();

export class UserRepository {
  create(data){ return dao.create(data); }
  findByEmail(email){ return dao.findByEmail(email); }
  findById(id){ return dao.findById(id); }
  deleteById(id){ return dao.deleteById(id); }
  updateLastConnection(id, date){ return dao.updateById(id, { last_connection: date }); }
  updatePassword(id, hashed){ return dao.updateById(id, { password: hashed }); }
}
