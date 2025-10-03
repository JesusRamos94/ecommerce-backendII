import { PasswordResetTokenDAO } from '../daos/passwordResetToken.dao.js';
const dao = new PasswordResetTokenDAO();

export class PasswordResetTokenRepository {
  create(data){ return dao.create(data); }
  findActiveByUser(userId){ return dao.findActiveByUser(userId); }
  consume(userId, tokenHash){ return dao.consume(userId, tokenHash); }
}
