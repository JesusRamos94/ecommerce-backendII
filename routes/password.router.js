import { Router } from 'express';
import { PasswordController } from '../controllers/password.controller.js';

const ctrl = new PasswordController();
const router = Router();

router.post('/forgot', (req, res, next) => ctrl.forgot(req, res).catch(next));
router.post('/reset', (req, res, next) => ctrl.reset(req, res).catch(next));

export default router;
