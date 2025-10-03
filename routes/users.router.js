import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';
import { requireAuth, requireRole, requireSelfOrAdmin } from '../middleware/auth.middleware.js';

const ctrl = new UsersController();
const router = Router();

router.get('/:id', requireAuth('jwt'), requireSelfOrAdmin(), (req, res, next) => ctrl.getById(req, res).catch(next));
router.delete('/:id', requireAuth('jwt'), requireRole('admin'), (req, res, next) => ctrl.delete(req, res).catch(next));

export default router;
