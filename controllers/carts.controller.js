import { CartService } from '../services/cart.service.js';
const carts = new CartService();

export class CartsController {
  async create(req, res){
    const cart = await carts.create();
    res.status(201).json({ status: 'success', payload: cart });
  }

  async get(req, res){
    const cart = await carts.get(req.params.cid);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });
    res.json({ status: 'success', payload: cart });
  }

  async addProduct(req, res){
    const qty = req.body.quantity ? Number(req.body.quantity) : 1;
    const cart = await carts.addProduct(req.params.cid, req.params.pid, qty);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });
    res.json({ status: 'success', payload: cart });
  }

  async updateQty(req, res){
    const qty = Number(req.body.quantity);
    if (!Number.isFinite(qty) || qty < 1) throw Object.assign(new Error('Invalid quantity'), { status: 400 });
    const cart = await carts.updateQty(req.params.cid, req.params.pid, qty);
    if (!cart) throw Object.assign(new Error('Cart or product not found'), { status: 404 });
    res.json({ status: 'success', payload: cart });
  }

  async removeProduct(req, res){
    const cart = await carts.removeProduct(req.params.cid, req.params.pid);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });
    res.json({ status: 'success', payload: cart });
  }
}
