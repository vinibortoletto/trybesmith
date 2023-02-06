import { Request, Response } from 'express';
import ProductService from '../services/Product.service';

export default class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    try {
      const newProduct = await this.productService.create(req.body); 
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public findAll = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
} 