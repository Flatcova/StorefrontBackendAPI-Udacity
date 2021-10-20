import express, {Request, Response} from "express";
import { verifyAuthToken } from "../middleware/auth";
import { ProdcutStore } from "../models/products";
import { Products } from "../types";

const store = new ProdcutStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (_req: Request, res: Response) => {
    const id = _req.params.id
    const product = await store.show(id);
    res.json(product);
}

const category = async (_req: Request, res: Response) => {
    const category = _req.params.category
    const products = await store.category(category);
    res.json(products);
}

const topProducts = async (_req: Request, res: Response) => {
    const products = await store.top();
    res.json(products);
}

const create = async (_req: Request, res: Response) => {
    const product: Products = {
        id: 1,
        name: _req.body.name,
        price: Number(_req.body.price),
        category: _req.body.category
    }
    const newProduct = await store.create(product);
    res.json(newProduct);
}

const remove = async (_req: Request, res: Response) => {
    const id = _req.params.id
    const product = await store.delete(id);    
    res.json(product);
}

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/product/:id', show)
    app.get('/top-products', topProducts);
    app.get('/products/:category', category);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken, remove);
}

export default products_routes;