"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var orders_handler_1 = __importDefault(require("./handlers/orders_handler"));
var products_handler_1 = __importDefault(require("./handlers/products_handler"));
var users_handler_1 = __importDefault(require("./handlers/users_handler"));
var app = (0, express_1["default"])();
var PORT = 3000;
app.use(body_parser_1["default"].json());
app.get('/', function (_req, res) {
    res.send('Welcome Screen');
});
(0, products_handler_1["default"])(app);
(0, users_handler_1["default"])(app);
(0, orders_handler_1["default"])(app);
app.listen(PORT, function () {
    console.log("listening in port " + PORT);
});
exports["default"] = app;
