import { PasswordResetTokenModel } from '../models/passwordResetToken.model.js';

export class PasswordResetTokenDAO {
  create(data){ return PasswordResetTokenModel.create(data); }
  findActiveByUser(userId){
    const now = new Date();
    return PasswordResetTokenModel.findOne({ user: userId, usedAt: null, expiresAt: { $gt: now } });
  }
  consume(userId, tokenHash){
    const now = new Date();
    return PasswordResetTokenModel.findOneAndUpdate(
      { user: userId, tokenHash, usedAt: null, expiresAt: { $gt: now } },
      { usedAt: now },
      { new: true }
    );
  }
}
