import { TicketModel } from '../models/ticket.model.js';

export class TicketDAO {
  create(data){ return TicketModel.create(data); }
  findById(id){ return TicketModel.findById(id).populate('products.product').lean(); }
}
