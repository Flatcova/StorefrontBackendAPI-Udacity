//@ts-ignore

import client from '../database';
import bcrypt from 'bcrypt';
import { User } from '../types';

const { SALT_ROUNDS, HASH_SECRET } = process.env;
export type SerializeUser = Omit<User, 'password'>;

export class Users {
  private serializeUser(obj: any): SerializeUser {
    return {
      id: obj.id,
      firstName: obj.firstname,
      lastName: obj.lastname
    }
  }

  async create(u: User): Promise<SerializeUser> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(u.password + HASH_SECRET, Number(SALT_ROUNDS));

      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0];

      conn.release();
      return this.serializeUser(user);
    } catch (err) {
      throw new Error(`unable to create new user. Error: ${err}`);
    }
  }

  async authenticate(u: User): Promise<boolean | null> {
    //@ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT password FROM users WHERE firstname=($1)';
    const result = await conn.query(sql, [u.firstName]);
    conn.release();
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(u.password + HASH_SECRET, user.password)) {
        return true;
      }
    }

    return null;
  }

  async index(): Promise<User> {
    //@ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT * FROM users';

    const result = await conn.query(sql);
    conn.release();
    const user = result.rows;
    return user;
  }

  async show(id: string): Promise<User> {
    //@ts-ignore
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE id=($1)';

    const result = await conn.query(sql, [id]);
    conn.release();
    const user = result.rows[0];
    return user;
  }
}
