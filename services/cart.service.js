import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
const carts = new CartRepository();
const products = new ProductRepository();

export class CartService {
  create(){ return carts.create(); }
  get(id){ return carts.get(id); }
  async addProduct(cid, pid, qty=1){
    const prod = await products.findById(pid);
    if (!prod) throw Object.assign(new Error('Product not found'), { status: 404 });
    return carts.addProduct(cid, pid, qty);
  }
  updateQty(cid, pid, qty){ return carts.updateQty(cid, pid, qty); }
  removeProduct(cid, pid){ return carts.removeProduct(cid, pid); }
  clear(cid){ return carts.clear(cid); }
}
