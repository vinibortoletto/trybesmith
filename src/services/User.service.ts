import jwt from 'jsonwebtoken';
import { ILogin } from '../interfaces/login.interface';
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

  public async login(loginInfo: ILogin): Promise<IResultObject> {
    const user = await this.userModel.findByUsername(loginInfo.username);
    const error = { type: 'INVALID_USER', message: 'Username or password invalid' };

    if (!user || user.password !== loginInfo.password) return error;

    const token = jwt.sign(loginInfo, secret);

    return {
      type: null,
      message: token,
    };
  }
}
