import { ProductService } from '../services/product.service.js';
const products = new ProductService();

export class ProductsController {
  async list(req, res){
    const { page, limit, category, status } = req.query;
    const result = await products.list({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      category,
      status: typeof status !== 'undefined' ? status === 'true' : undefined
    });
    res.json({ status: 'success', ...result });
  }

  async get(req, res){
    const prod = await products.get(req.params.pid);
    if (!prod) throw Object.assign(new Error('Product not found'), { status: 404 });
    res.json({ status: 'success', payload: prod });
  }

  async create(req, res){
    const created = await products.create(req.body);
    res.status(201).json({ status: 'success', payload: created });
  }

  async update(req, res){
    const updated = await products.update(req.params.pid, req.body);
    if (!updated) throw Object.assign(new Error('Product not found'), { status: 404 });
    res.json({ status: 'success', payload: updated });
  }

  async remove(req, res){
    const removed = await products.remove(req.params.pid);
    if (!removed) throw Object.assign(new Error('Product not found'), { status: 404 });
    res.json({ status: 'success', payload: removed });
  }
}
