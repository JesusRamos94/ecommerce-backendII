import { Router } from 'express';
import { CartsController } from '../controllers/carts.controller.js';
import { TicketsController } from '../controllers/tickets.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';

const cartsCtrl = new CartsController();
const ticketsCtrl = new TicketsController();
const router = Router();

router.post('/', (req, res, next) => cartsCtrl.create(req, res).catch(next));
router.get('/:cid', (req, res, next) => cartsCtrl.get(req, res).catch(next));

router.post('/:cid/products/:pid', requireAuth('jwt'), requireRole('user'), (req, res, next) => cartsCtrl.addProduct(req, res).catch(next));
router.put('/:cid/products/:pid', requireAuth('jwt'), requireRole('user'), (req, res, next) => cartsCtrl.updateQty(req, res).catch(next));
router.delete('/:cid/products/:pid', requireAuth('jwt'), requireRole('user'), (req, res, next) => cartsCtrl.removeProduct(req, res).catch(next));

router.post('/:cid/purchase', requireAuth('jwt'), (req, res, next) => ticketsCtrl.purchase(req, res).catch(next));

export default router;
