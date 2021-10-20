"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var auth_1 = require("../middleware/auth");
var order_status_1 = require("../middleware/order_status");
var orders_1 = require("../models/orders");
var store = new orders_1.Orders();
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, store.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
var userOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, orders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.user_id;
                return [4 /*yield*/, store.userOrders(id)];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [2 /*return*/];
        }
    });
}); };
var userOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.user_id;
                return [4 /*yield*/, store.userOrder(id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    id: 1,
                    user_id: _req.body.user_id
                };
                return [4 /*yield*/, store.create(order)];
            case 1:
                newOrder = _a.sent();
                res.json(newOrder);
                return [2 /*return*/];
        }
    });
}); };
var finishOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, endOrder, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.update(id)];
            case 2:
                endOrder = _a.sent();
                res.json(endOrder);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var removeOrder = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleteOrder, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = _req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store["delete"](id)];
            case 2:
                deleteOrder = _a.sent();
                res.json(deleteOrder);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addOrderProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_product, addedProduct, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_product = {
                    id: 1,
                    order_id: _req.params.id,
                    product_id: _req.body.product_id,
                    quantity: Number(_req.body.quantity)
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(order_product)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.status(400);
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var orders_routes = function (app) {
    app.get('/orders', index);
    app.get('/orders/:user_id', auth_1.verifyAuthToken, userOrders);
    app.post('/orders', [auth_1.verifyAuthToken, order_status_1.openOrder], create);
    app.get('/order/:user_id', auth_1.verifyAuthToken, userOrder);
    app.post('/order/:id/products', auth_1.verifyAuthToken, addOrderProduct);
    app.put('/order/:id', auth_1.verifyAuthToken, finishOrder);
    app["delete"]('/order/:id', auth_1.verifyAuthToken, removeOrder);
};
exports["default"] = orders_routes;
