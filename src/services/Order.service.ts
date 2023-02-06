import connection from '../models/connection';
import OrderModel from '../models/Order.model';

export default class OrderService {
  constructor(private orderModel = new OrderModel(connection)) {}

  public async findAll() {
    const orders = await this.orderModel.findAll();
    return orders;
  }
}
