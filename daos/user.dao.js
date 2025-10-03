import { UserModel } from '../models/user.model.js';

export class UserDAO {
  create(data){ return UserModel.create(data); }
  findByEmail(email){ return UserModel.findOne({ email }); }
  findById(id){ return UserModel.findById(id); }
  deleteById(id){ return UserModel.findByIdAndDelete(id); }
  updateById(id, update){ return UserModel.findByIdAndUpdate(id, update, { new: true }); }
}
