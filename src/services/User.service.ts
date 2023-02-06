import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/User.model';

const secret = process.env.JWT_SECRET || 'Secret';

export default class UserService {
  constructor(private userModel = new UserModel(connection)) {}

  public async create(user:IUser):Promise<string> {
    await this.userModel.create(user);
    const token = jwt.sign(user, secret);
    return token;
  }
}
