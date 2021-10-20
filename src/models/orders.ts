//@ts-ignore
import client from "../database";
import { Order, OrderProduct } from "../types";
import { ProdcutStore } from "./products";

const product = new ProdcutStore();

export class Orders {
  async index(): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get orders. Error: ${err}`);
    }
  }

  async userOrders(id: string): Promise<Order[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)";
      const result = await conn.query(sql, [id, "complete"]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`could not get orders from ${id}. Error: ${err}`);
    }
  }

  async userOrder(id: string): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)";
      const result = await conn.query(sql, [id, "active"]);

      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`could not get orders from ${id}. Error: ${err}`);
    }
  }

  async create(o: Omit<Order, "order_status">): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *";
      const result = await conn.query(sql, [o.user_id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not create new order. Error: ${err}`);
    }
  }

  async update(id: string): Promise<Order> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET order_status=($1) WHERE id=($2) RETURNING *";
      const result = await conn.query(sql, ["complete", id]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not finish the order. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
        const sql = "DELETE FROM order_product WHERE order_id=($1)";
        // @ts-ignore
        const conn = await client.connect();
        const update = await conn.query(sql, [id]);
        
        if (update.rows[0] !== undefined) {
            throw new Error(`Failed to remove the products from the order ${id}`);
          }
          conn.release();
    } catch (err) {
        throw new Error(`Could not delete order ${id} products. Error: ${err}`);
    }

    try {
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await client.connect(); 
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(order: OrderProduct): Promise<OrderProduct> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await conn.query(sql, [order.order_id]);
      conn.release();
      const data = result.rows[0];

      if (data.order_status !== "active") {
        throw new Error(`Can't add product this order it's completed`);
      }
    } catch (err) {
      throw new Error(`This order doesn't exists`);
    }

    try {      
      const updated = await product.update(order.product_id, order.quantity);
      console.log(updated);
      if(updated){
        const sql =
          "INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
        //@ts-ignore
        const conn = await client.connect();
        const result = await conn.query(sql, [order.order_id, order.product_id, order.quantity]);      
        const data = result.rows[0];
        console.log(data);
        conn.release();
        
        return data;
      }
      
      throw new Error(
        `Could not add product ${order.product_id} to order ${order.order_id}, couldn't update values`
      );
    } catch (err) {
      throw new Error(
        `Could not add product ${order.product_id} to order ${order.order_id}: ${err}`
      );
    }
  }
}
