import { Router } from 'express';
import { TicketsController } from '../controllers/tickets.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const ctrl = new TicketsController();
const router = Router();

router.get('/:tid', requireAuth('jwt'), (req, res, next) => ctrl.get(req, res).catch(next));

export default router;
