"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const PORT = 3000;
let cnn = async () => {
    await database_1.default.connect((err, client, release) => {
        if (err) {
            return console.error(err.stack);
        }
        client.query('SELECT * FROM testing', (err, result) => {
            release();
            if (err) {
                return console.error(err.stack);
            }
            console.log(result.rows);
        });
    });
};
cnn();
app.listen(PORT, () => {
    console.log(`listening in port ${PORT}`);
});
exports.default = app;
