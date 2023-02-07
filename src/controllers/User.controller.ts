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

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const { statusCode, message } = await this.userService.login(username, password);
      if (statusCode) return res.status(statusCode).json({ message });
      return res.status(200).json({ token: message });  
    } catch (error) {
      console.log('🚀 ~ file: User.controller.ts:24 ~ UserController ~ login= ~ error', error);
      return res.status(500).json(error);  
    }
  };
}
