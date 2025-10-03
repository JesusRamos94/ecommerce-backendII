import { ProductDAO } from '../daos/product.dao.js';

const dao = new ProductDAO();

export class ProductRepository {
  async paginate({ page=1, limit=10, category, status } = {}){
    const query = {};
    if (category) query.category = category;
    if (typeof status === 'boolean') query.status = status;
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      dao.find(query, { skip, limit }),
      dao.count(query)
    ]);
    return { items, page, limit, total, pages: Math.ceil(total/limit) };
  }
  findById(id){ return dao.findById(id); }
  create(data){ return dao.create(data); }
  update(id, data){ return dao.update(id, data); }
  delete(id){ return dao.delete(id); }
}
