import { ProductModel } from '../models/product.model.js';

export class ProductDAO {
  find(query={}, { skip=0, limit=10 }={}){ return ProductModel.find(query).skip(skip).limit(limit).lean(); }
  count(query={}){ return ProductModel.countDocuments(query); }
  findById(id){ return ProductModel.findById(id).lean(); }
  create(data){ return ProductModel.create(data); }
  update(id, data){ return ProductModel.findByIdAndUpdate(id, data, { new: true }).lean(); }
  delete(id){ return ProductModel.findByIdAndDelete(id).lean(); }
}
