import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const ctrl = new ProductsController();
const router = Router();

router.get('/', (req, res, next) => ctrl.list(req, res).catch(next));
router.get('/:pid', (req, res, next) => ctrl.get(req, res).catch(next));

router.post('/', requireAuth('jwt'), requireRole('admin'), (req, res, next) => ctrl.create(req, res).catch(next));
router.put('/:pid', requireAuth('jwt'), requireRole('admin'), (req, res, next) => ctrl.update(req, res).catch(next));
router.delete('/:pid', requireAuth('jwt'), requireRole('admin'), (req, res, next) => ctrl.remove(req, res).catch(next));

export default router;
