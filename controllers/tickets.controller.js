import { TicketService } from '../services/ticket.service.js';
const tickets = new TicketService();

export class TicketsController {
  async purchase(req, res) {
    const result = await tickets.purchase(req.params.cid, req.user.email);
    const status = result.ticket ? 201 : 409;

    const payload = result.ticket || null;

    const ticketId = result.ticket ? (result.ticket._id || result.ticket.id) : null;

    res.status(status).json({
      status: 'success',
      payload,
      ticket: result.ticket,
      ticketId,
      processed: result.processed,
      unprocessed: result.unprocessed,
      amount: result.amount
    });
  }

  async get(req, res) {
    const t = await tickets.get(req.params.tid);
    if (!t) throw Object.assign(new Error('Ticket not found'), { status: 404 });
    res.json({ status: 'success', payload: t });
  }
}