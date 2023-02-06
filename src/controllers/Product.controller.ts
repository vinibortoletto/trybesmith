import { Request, Response } from 'express';
import connection from '../models/connection';
import ProductModel from '../models/Product.model';

export default class ProductController {
  constructor(private productModel = new ProductModel(connection)) {}

  public create = async (req: Request, res: Response) => {
    const newProduct = await this.productModel.create(req.body); 
    res.status(201).json(newProduct);
  };

  public findAll = async (req: Request, res: Response) => {
    const products = await this.productModel.findAll();
    res.status(200).json(products);
  };
}