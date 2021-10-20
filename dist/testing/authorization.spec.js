"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { TOKEN_SECRET } = process.env;
describe('Testing Token', () => {
    const USER = {
        id: 1,
        firstName: "Marwio",
        lastName: "Riows",
        password: "testing1q23",
    };
    it('shold return a token', () => {
        const TOKEN = jsonwebtoken_1.default.sign({ user: USER }, TOKEN_SECRET || "devs");
        expect(TOKEN).not.toBeNull();
    });
});
