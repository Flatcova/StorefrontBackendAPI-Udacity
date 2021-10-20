import express from 'express';
//@ts-ignore
import client from '../database';

export const openOrder = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const {id} = res.locals.auth.user;
        
    //@ts-ignore
    const conn = await client.connect();
    const sql = `SELECT * FROM orders WHERE user_id=($1) AND order_status=($2)`;
    const result = await conn.query(sql, [id, 'active']);
    conn.release();

    if(result.rows.length){
        throw new Error(`An order it's already open`);
    }

    next();
  } catch (error) {
    res.status(401);
    res.json(`Order ${error}`);
    return;
  }
};
