import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IProduct } from '../interfaces/product.interface';

export default class ProductModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    
    const [{ insertId: id }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?,?)',
      [name, amount],
    );

    const newProduct = { id, name, amount };
    return newProduct;
  }

  public async findAll(): Promise<IProduct[]> {
    const query = 'SELECT * FROM Trybesmith.products';
    const [products] = await this.connection.execute(query);
    return products as IProduct[];
  }
}
