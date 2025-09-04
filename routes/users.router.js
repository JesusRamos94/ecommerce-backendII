import { Router } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.model.js';
import { requireAuth, requireRole, requireSelfOrAdmin } from '../middleware/auth.middleware.js';

const router = Router();
const SALT_ROUNDS = 10;

router.post('/', async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password, cart, role } = req.body;

        if (!password) throw Object.assign(new Error('Password is required'), { status: 400 });

        const exists = await UserModel.findOne({ email });
        if (exists) throw Object.assign(new Error('Email already in use'), { status: 409 });

        const hashed = bcrypt.hashSync(password, SALT_ROUNDS);

        const user = await UserModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashed,
            cart: cart || null,
            role: role || undefined
        });

        res.status(201).json({ status: 'success', payload: user.toJSON() });
    } catch (err) {
        next(err);
    }
});

router.get('/', requireAuth('jwt'), requireRole('admin'), async (_req, res, next) => {
    try {
        const users = await UserModel.find().lean();
        const safe = users.map(({ password, ...u }) => u);
        res.json({ status: 'success', payload: safe });
    } catch (err) {
        next(err);
    }
});

router.get('/:id', requireAuth('jwt'), requireSelfOrAdmin(), async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id).lean();
        if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
        const { password, ...safe } = user;
        res.json({ status: 'success', payload: safe });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', requireAuth('jwt'), requireSelfOrAdmin(), async (req, res, next) => {
    try {
        const data = { ...req.body };
        if (data.password) {
            data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
        }
        if (req.user.role !== 'admin') delete data.role;

        const updated = await UserModel.findByIdAndUpdate(req.params.id, data, { new: true }).lean();
        if (!updated) throw Object.assign(new Error('User not found'), { status: 404 });
        const { password, ...safe } = updated;
        res.json({ status: 'success', payload: safe });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', requireAuth('jwt'), requireRole('admin'), async (req, res, next) => {
    try {
        const deleted = await UserModel.findByIdAndDelete(req.params.id).lean();
        if (!deleted) throw Object.assign(new Error('User not found'), { status: 404 });
        const { password, ...safe } = deleted;
        res.json({ status: 'success', payload: safe });
    } catch (err) {
        next(err);
    }
});

export default router;