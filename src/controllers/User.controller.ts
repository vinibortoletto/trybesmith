import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/User.model';

const secret = process.env.JWT_SECRET || 'Secret';

export default class UserController {
  constructor(private userModel = new UserModel(connection)) {}

  public create = async (req: Request, res: Response) => {
    await this.userModel.create(req.body);
    const token = jwt.sign(req.body, secret);
    res.status(201).json({ token });
  };
}
