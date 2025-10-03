import { CartDAO } from '../daos/cart.dao.js';

const dao = new CartDAO();

export class CartRepository {
  create(data){ return dao.create(data); }
  get(id){ return dao.get(id); }
  async addProduct(cid, pid, qty=1){
    const cart = await dao.getMutable(cid);
    if (!cart) return null;
    const item = cart.products.find(p => p.product.toString() === pid);
    if (item) item.quantity += qty;
    else cart.products.push({ product: pid, quantity: qty });
    await cart.save();
    return cart.populate('products.product');
  }
  async updateQty(cid, pid, qty){
    const cart = await dao.getMutable(cid);
    if (!cart) return null;
    const item = cart.products.find(p => p.product.toString() === pid);
    if (!item) return null;
    item.quantity = qty;
    await cart.save();
    return cart.populate('products.product');
  }
  async removeProduct(cid, pid){
    const cart = await dao.getMutable(cid);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart.populate('products.product');
  }
  clear(cid){ return dao.getMutable(cid).then(async c => { if (!c) return null; c.products=[]; await c.save(); return c; }); }
}
