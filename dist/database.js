"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DATABASE = _a.DATABASE, TEST_DATABASE = _a.TEST_DATABASE, USERNAME = _a.USERNAME, PASSWORD = _a.PASSWORD, HOST = _a.HOST, DEV_PORT = _a.DEV_PORT, TEST_PORT = _a.TEST_PORT, ENV = _a.ENV;
var client;
if (ENV === 'test') {
    client = new pg_1.Pool({
        database: TEST_DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: Number(TEST_PORT),
        host: HOST
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        database: DATABASE,
        user: 'postgres',
        password: PASSWORD,
        port: Number(DEV_PORT),
        host: HOST
    });
}
exports["default"] = client;
