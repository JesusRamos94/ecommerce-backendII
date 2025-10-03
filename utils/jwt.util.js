import jwt from 'jsonwebtoken';

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  const payload = { id: user.id || user._id.toString(), email: user.email, role: user.role };
  return jwt.sign(payload, secret, { expiresIn });
};
