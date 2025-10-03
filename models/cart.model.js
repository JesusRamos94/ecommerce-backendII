import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
  }]
}, { timestamps: true });

export const CartModel = mongoose.model('Carts', cartSchema);
