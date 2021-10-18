"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { DATABASE, TEST_DATABASE, USERNAME, PASSWORD, HOST, PORT, ENV } = process.env;
let client;
console.log(ENV);
if (ENV === 'test') {
    client = new pg_1.Pool({
        database: TEST_DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: PORT,
        host: HOST
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        database: DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: PORT,
        host: HOST
    });
}
exports.default = client;
