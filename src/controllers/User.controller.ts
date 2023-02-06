import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    try {
      const token = await this.userService.create(req.body);
      return res.status(201).json({ token });  
    } catch (error) {
      return res.status(500).json(error);  
    }
  };
}
