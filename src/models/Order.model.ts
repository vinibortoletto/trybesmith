import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IOrder } from '../interfaces/order.interface';

export default class OrderModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findAll(): Promise<IOrder[]> {
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

    const [orders] = await this.connection.execute<IOrder[] & RowDataPacket[]>(
      query,
    );
    return orders;
  }

  public async create(
    productsIds: number[],
    userId: number | undefined,
  ): Promise<void> {
    const insertQuery = 'INSERT INTO Trybesmith.orders (user_id) VALUES (?)';

    const [{ insertId: orderId }] = await this.connection.execute<ResultSetHeader>(
      insertQuery,
      [userId],
    );

    const updateQuery = 'UPDATE Trybesmith.products SET order_id = ? WHERE id = ?';
    
    await Promise.all(productsIds.map((id) => (
      this.connection.execute(updateQuery, [orderId, id])
    )));
  }

  public async findById(id: number): Promise<IOrder> {
    const query = 'SELECT * FROM Trybesmith.orders WHERE id = ?';

    const [[order]] = await this.connection.execute<(
    IOrder & RowDataPacket)[]>(
      query,
      [id],
      );

    return order;
  }
}
