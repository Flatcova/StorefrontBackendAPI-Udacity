import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../app";
import { Orders } from "../models/orders";
import { ProdcutStore } from "../models/products";
import { Order, OrderProduct, User } from "../types";
const { TOKEN_SECRET } = process.env;

const request = supertest(app);
describe("Testing order endpoints reponses", () => {
  const USER: User = {
    id: 1,
    firstName: "Marwio",
    lastName: "Riows",
    password: "testing1q23",
  };

  const ORDER:  Omit<Order, "order_status"> = {
    id: 1,
    user_id: '1'
    };

    const ORDER_PRODUCT: OrderProduct = {
        id: 1,
            order_id: '2',
            product_id: '1',
            quantity: 20
    }
  const TOKEN = jwt.sign({ user: USER }, TOKEN_SECRET || "devs");

  it("should get the response from /orders [GET] route", async () => {
    const response = await request
      .get("/orders")

    expect(response.body.length).toEqual(0);
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /orders/:id [GET] route when passing the user id", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${TOKEN}`);    
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from orders [POST] route when creating a new order", async () => {
    const response = await request
      .post("/orders")
      .send(ORDER)
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /order/:id [GET] route when passing the user id for an active order", async () => {
    const response = await request
      .get("/order/1")
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from order product [POST] route when inserting order product", async () => {
    const response = await request
      .post("/order/2/products")
      .send(ORDER_PRODUCT)
      .set("Authorization", `Bearer ${TOKEN}`);      
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /order/:id [PUT] route when updating order to complete", async () => {
    const response = await request.put("/order/2")
    .set("Authorization", `Bearer ${TOKEN}`);;
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /order [DELETE] route when passing an order id", async () => {
    const response = await request.delete("/order/2")
    .set("Authorization", `Bearer ${TOKEN}`);;
    expect(response.status).toBe(200);
  });

  it("should get the reponse 401 from /orders/:id [GET] route when missing AuthToken", async () => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(401);
  });

  it("should get the reponse 401 from /order/:id [GET] route when missing AuthToken", async () => {
    const response = await request.get("/order/1");
    expect(response.status).toBe(401);
  });

  it("should get the reponse 401 from /orders [POST] route when missing AuthToken", async () => {
    const response = await request.post("/orders").send(ORDER);
    expect(response.status).toBe(401);
  });
  
  it("should get the reponse 401 from /order/:id/products [POST] route when missing AuthToken", async () => {
    const response = await request.post("/order/1/products").send(ORDER_PRODUCT);
    expect(response.status).toBe(401);
  });

  it("should get the reponse 401 from /order/:id [PUT] route when missing AuthToken", async () => {
    const response = await request.put("/order/2");
    expect(response.status).toBe(401);
  });
  
  it("should get the reponse 401 from /order/:id [DELETE] route when missing AuthToken", async () => {
    const response = await request.delete("/order/1");
    expect(response.status).toBe(401);
  });
});