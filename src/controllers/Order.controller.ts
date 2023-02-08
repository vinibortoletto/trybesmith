import { Request, Response } from 'express';
import OrderService from '../services/Order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public findAll = async (req:Request, res: Response) => {
    try {
      const orders = await this.orderService.findAll();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public create = async (req:Request, res: Response) => {
    const { productsIds, user: { username } } = req.body;
    
    try {
      const newOrder = await this.orderService.create(productsIds, username);
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
