import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../interfaces/order.interface';

export default class OrderModel {
  private connection: Pool;

  constructor(connection:Pool) {
    this.connection = connection;
  }

  public async findAll():Promise<IOrder[]> {
    const query = `
      SELECT 
        o.id,
        o.user_id as userId,
        JSON_ARRAYAGG(p.id) as productsIds
      FROM Trybesmith.orders as o
      INNER JOIN Trybesmith.products as p
      ON o.id = p.order_id
      GROUP BY o.id;
    `;

    const [orders] = await this.connection.execute<IOrder[] & RowDataPacket[]>(query);
    return orders;
  }
}
