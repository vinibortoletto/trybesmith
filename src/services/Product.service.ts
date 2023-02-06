import { IProduct } from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductModel from '../models/Product.model';

export default class ProductService {
  constructor(private productModel = new ProductModel(connection)) {}

  public async create(product: IProduct): Promise<IProduct> {
    const newProduct = await this.productModel.create(product); 
    return newProduct;
  } 

  public async findAll():Promise<IProduct[]> {
    const products = await this.productModel.findAll();
    return products;
  }
}
