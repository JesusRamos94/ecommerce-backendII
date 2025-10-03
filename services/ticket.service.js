import crypto from 'crypto';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';

const tickets = new TicketRepository();
const carts = new CartRepository();
const products = new ProductRepository();

export class TicketService {
  async purchase(cid, purchaserEmail) {
    const cart = await carts.get(cid);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });

    const processed = [];
    const unprocessed = [];
    let amount = 0;

    for (const item of cart.products) {
      const p = await products.findById(item.product._id || item.product);
      if (!p) { unprocessed.push({ product: item.product, reason: 'not_found' }); continue; }
      if (p.stock >= item.quantity) {

        const newStock = p.stock - item.quantity;
        await products.update(p._id, { stock: newStock });
        processed.push({ product: p._id, quantity: item.quantity, unit_price: p.price });
        amount += p.price * item.quantity;
      } else {
        unprocessed.push({ product: p._id, wanted: item.quantity, available: p.stock, reason: 'insufficient_stock' });
      }
    }

    if (processed.length === 0) {

      return { processed, unprocessed, ticket: null, amount: 0 };
    }

    const code = crypto.randomBytes(8).toString('hex');
    const ticket = await tickets.create({
      code,
      amount,
      purchaser: purchaserEmail,
      products: processed
    });

    await carts.clear(cid);
    const cleanTicket = ticket.toObject ? ticket.toObject() : ticket;
    return { processed, unprocessed, ticket: cleanTicket, amount };
  }

  get(id) { return tickets.findById(id); }
}
