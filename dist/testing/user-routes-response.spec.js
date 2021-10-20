"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const { TOKEN_SECRET } = process.env;
const request = (0, supertest_1.default)(app_1.default);
describe("Testing user endpoints reponses", () => {
    const USER = {
        id: 1,
        firstName: "Marwio",
        lastName: "Riows",
        password: "testing1q23",
    };
    const TOKEN = jsonwebtoken_1.default.sign({ user: USER }, TOKEN_SECRET || "devs");
    it("should get the response from /users [GET] route", async () => {
        const response = await request
            .get("/users")
            .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.body.length).toEqual(2);
        expect(response.status).toBe(200);
    });
    it("should get the reponse 200 from /users/:id [GET] route when passing the user id", async () => {
        const response = await request
            .get("/users/1")
            .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.body.id).toEqual(USER.id);
        expect(response.status).toBe(200);
    });
    it("should get the reponse 200 from users [POST] route when creating a new user", async () => {
        const response = await request
            .post("/users")
            .send(USER)
            .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.status).toBe(200);
    });
    it("should get the reponse 401 from /users [GET] route when missing AuthToken", async () => {
        const response = await request.get("/users");
        expect(response.status).toBe(401);
    });
    it("should get the reponse 401 from /users/:id [GET] route when missing AuthToken", async () => {
        const response = await request.get("/users/1");
        expect(response.status).toBe(401);
    });
    it("should get the reponse 401 from /users [POST] route when missing AuthToken", async () => {
        const response = await request.post("/users").send(USER);
        expect(response.status).toBe(401);
    });
});
