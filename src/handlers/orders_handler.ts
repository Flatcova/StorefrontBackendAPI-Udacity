import express, {Request, Response} from "express";
import { verifyAuthToken } from "../middleware/auth";
import { openOrder } from "../middleware/order_status";
import { Orders } from "../models/orders";
import { Order, OrderProduct } from "../types";

const store = new Orders();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
}

const userOrders = async (_req: Request, res: Response) => {
    const id: string = _req.params.user_id
    const orders = await store.userOrders(id);
    res.json(orders);
}

const userOrder = async (_req: Request, res: Response) => {
    const id: string = _req.params.user_id;
    const order = await store.userOrder(id);
    res.json(order);
}

const create = async (_req:Request, res: Response) => {
    const order: Omit<Order, "order_status"> = {
        id: 1,
        user_id: _req.body.user_id
    }
    const newOrder = await store.create(order);
    res.json(newOrder);
}

const finishOrder = async (_req:Request, res:Response) => {
    const id: string = _req.params.id;
    try {
        const endOrder = await store.update(id);
        res.json(endOrder);
    } catch (err) {
        res.status(400);
        res.json(err)
    }
}

const removeOrder = async (_req:Request, res:Response) => {
    const id: string = _req.params.id;
    try {
        const deleteOrder = await store.delete(id);
        res.json(deleteOrder);
    } catch (err) {
        res.status(400);
        res.json(err)
    }
}

const addOrderProduct = async (_req:Request, res: Response) => {

    const order_product: OrderProduct = {
        id: 1,
        order_id: _req.params.id,
        product_id: _req.body.product_id,
        quantity: Number(_req.body.quantity)
    }   

    try {        
        const addedProduct = await store.addProduct(order_product);
        res.json(addedProduct);
    } catch (err) {
      res.status(400)
      res.json(err)  
    }
}

const orders_routes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:user_id', verifyAuthToken, userOrders);
    app.post('/orders', [verifyAuthToken, openOrder], create);
    app.get('/order/:user_id', verifyAuthToken, userOrder);
    app.post('/order/:id/products', verifyAuthToken, addOrderProduct);
    app.put('/order/:id', verifyAuthToken, finishOrder);
    app.delete('/order/:id', verifyAuthToken, removeOrder);
}

export default orders_routes;