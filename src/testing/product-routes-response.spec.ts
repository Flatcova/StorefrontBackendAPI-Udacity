import jwt from "jsonwebtoken";
import supertest from "supertest";
import app from "../app";
import { Products, User } from "../types";
const { TOKEN_SECRET } = process.env;

const request = supertest(app);
describe("Testing products endpoints reponses", () => {
  const product: Products = {
    id: 1,
    name: "AWS-Basics",
    price: 9.99,
    category: "book",
  };

  const USER: User = {
    id: 1,
    firstName: "Marwio",
    lastName: "Riows",
    password: "testing1q23",
  };

  const TOKEN = jwt.sign({ user: USER }, TOKEN_SECRET || "devs");

  it("should get the response from /products [GET] route", async () => {
    const response = await request.get("/products");
    expect(response.body.length).toEqual(1);
    expect(response.status).toBe(200);
  });

  it("should get the response for a single product from /product/:id [GET] route", async () => {
    const response = await request.get("/product/2");    
    expect(response.body.id).toEqual(2);
    expect(response.status).toBe(200);
  });

  it("should get the response for the top 5 products from /top-products [GET] route", async () => {
    const response = await request.get("/top-products");
    expect(response.body.length).toBeTruthy;
    expect(response.status).toBe(200);
  });

  it("should get the response whit all products from a category on /products/:category [GET] route", async () => {
    const response = await request.get("/products/book");
    expect(response.body.length).toBeTruthy;
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /products [POST] route when passing new product", async () => {
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(product);
    expect(response.body.name).toEqual(product.name);
    expect(response.status).toBe(200);
  });

  it("should get the reponse 200 from /products/:id [DELETE] route when deleting a product", async () => {
    const response = await request
      .delete("/products/2")
      .set("Authorization", `Bearer ${TOKEN}`);
    
    expect(response.body.id).toEqual(2);
    expect(response.status).toBe(200);
  });

  it("should get the reponse 401 from /products [POST] route when missing AuthToken", async () => {
    const response = await request.post("/products");
    expect(response.status).toBe(401);
  });
  it("should get the reponse 401 from /products/:id [DELETE] route when missing AuthToken", async () => {
    const response = await request.delete("/products/1");
    expect(response.status).toBe(401);
  });
});
