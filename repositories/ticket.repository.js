import { TicketDAO } from '../daos/ticket.dao.js';
const dao = new TicketDAO();

export class TicketRepository {
  create(data){ return dao.create(data); }
  findById(id){ return dao.findById(id); }
}
