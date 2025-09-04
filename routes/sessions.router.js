import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { UserModel } from '../models/user.model.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

const signToken = (user) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const payload = { id: user.id || user._id.toString(), email: user.email, role: user.role };
    return jwt.sign(payload, secret, { expiresIn });
};

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

        const token = signToken(user);
        const cookieName = process.env.JWT_COOKIE_NAME || 'jwt';

        res
            .cookie(cookieName, token, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({
                status: 'success',
                message: 'Logged in',
                token,
                payload: user.toJSON()
            });
    } catch (err) {
        next(err);
    }
});

router.get(
    '/current',
    (req, res, next) =>
        passport.authenticate('current', { session: false, failWithError: true })(req, res, next),
    (req, res) => {
        res.json({ status: 'success', payload: req.user });
    }
);

router.get('/me', requireAuth('jwt'), (req, res) => {
    res.json({ status: 'success', payload: req.user });
});

router.post('/logout', (_req, res) => {
    const cookieName = process.env.JWT_COOKIE_NAME || 'jwt';
    res.clearCookie(cookieName, { httpOnly: true, sameSite: 'lax' }).json({ status: 'success', message: 'Logged out' });
});

export default router;