import { ProductRepository } from '../repositories/product.repository.js';
const products = new ProductRepository();

export class ProductService {
  list(params){ return products.paginate(params); }
  get(id){ return products.findById(id); }
  create(data){ return products.create(data); }
  update(id, data){ return products.update(id, data); }
  remove(id){ return products.delete(id); }
}
