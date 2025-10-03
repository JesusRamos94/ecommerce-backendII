import crypto from 'crypto';
import { createHash } from 'crypto';

export const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');
