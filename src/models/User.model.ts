import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IUser } from '../interfaces/user.interface';

export default class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: IUser): Promise<number> {
    const query = `
      INSERT INTO Trybesmith.users (username, vocation, level, password) 
      VALUES (?,?,?,?)`;

    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      [user.username, user.vocation, user.level, user.password],
    );
    
    return insertId;
  }

  public async findByUsername(username:string): Promise<IUser> {
    const query = 'SELECT * FROM Trybesmith.users WHERE username = ?';
    const [[user]] = await this.connection.execute<(IUser & RowDataPacket)[]>(query, [username]);
    return user;
  }
}
