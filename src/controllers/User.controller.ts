import { Request, Response } from 'express';
import { IErrorTypes } from '../interfaces/errorTypes.interface';
import UserService from '../services/User.service';
import errorTypes from '../utils/errorTypes';

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

  public login = async (req: Request, res: Response) => {
    try {
      const { type, message } = await this.userService.login(req.body);
      if (type) return res.status(errorTypes[type as keyof IErrorTypes]).json({ message });
      return res.status(200).json({ token: message });  
    } catch (error) {
      return res.status(500).json(error);  
    }
  };
}
