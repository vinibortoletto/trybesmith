import connection from '../models/connection';
import OrderModel from '../models/Order.model';
import UserModel from '../models/User.model';

export default class OrderService {
  constructor(
    private orderModel = new OrderModel(connection),
    private userModel = new UserModel(connection),
  ) {}

  public async findAll() {
    const orders = await this.orderModel.findAll();
    return orders;
  }

  public async create(productsIds: number[], username:string) {
    const { id: userId } = await this.userModel.findByUsername(username);
    await this.orderModel.create(productsIds, userId); 
    return { userId, productsIds };
  }
}
