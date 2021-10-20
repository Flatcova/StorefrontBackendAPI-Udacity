//@ts-ignore
import client from "../database";
import { Products } from "../types";

export class ProdcutStore {
  async index(): Promise<Products[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Products> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  async category(category: string): Promise<Products> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products WHERE category=($1)";
      const result = await conn.query(sql, [category]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products ${category}. Error: ${err}`);
    }
  }

  async top(): Promise<Products[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM products ORDER BY selled DESC LIMIT 5 ";

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get products. Error: ${err}`);
    }
  }

  async create(p: Products): Promise<Products> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async update(id: string, value: number): Promise<boolean> {
    try {
      const sql =
        "UPDATE products SET selled=selled+($1) Where id=($2) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const update = await conn.query(sql, [value, id]);
      conn.release();
      const product: Products = update.rows[0];

      if (product) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(`Unable to update product: ${err}`);
    }
  }

  async delete(id: string): Promise<Products> {
    try {
      const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);      
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
