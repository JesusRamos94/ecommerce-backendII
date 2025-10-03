import { CartModel } from '../models/cart.model.js';

export class CartDAO {
  create(data={}){ return CartModel.create({ products: [], ...data }); }
  get(id){ return CartModel.findById(id).populate('products.product').lean(); }
  getMutable(id){ return CartModel.findById(id); }
}
