import jwt from 'jsonwebtoken';
import { IResultObject } from '../interfaces/resultObject.interface';
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

  public async login(username: string, password:string): Promise<IResultObject> {
    const user = await this.userModel.findByUsername(username);
    const error = { statusCode: 401, message: 'Username or password invalid' };

    if (!user || user.password !== password) return error;

    const token = jwt.sign(user, 'secret');

    return {
      statusCode: 200,
      message: token,
    };
  }
}
