import { Router } from 'express';
import passport from 'passport';
import { SessionsController } from '../controllers/sessions.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const ctrl = new SessionsController();
const router = Router();

router.post('/register', (req, res, next) => ctrl.register(req, res).catch(next));
router.post('/login', (req, res, next) => ctrl.login(req, res).catch(next));
router.get('/current', requireAuth('current'), (req, res, next) => ctrl.current(req, res).catch(next));
router.post('/logout', (req, res, next) => ctrl.logout(req, res).catch(next));

export default router;
