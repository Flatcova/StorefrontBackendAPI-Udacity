import { Orders } from "../models/orders";
import { ProdcutStore } from "../models/products";
import { Users } from "../models/users";
import { Order, OrderProduct, Products, User } from "../types";

const order = new Orders();
const user = new Users();

describe('ALL ORDERS TESTS', () => {
    beforeAll(async () => {
        const u: User = {
            id: 1,
            firstName: 'Marwio',
            lastName: 'Riows',
            password: 'testing1q23'
        }
        const data = await user.create(u);
    });

    describe('order methods', () => {
        it('should have a create method', async () => {
            expect(order.create).toBeDefined();
        })
        it('should have a index method', async () => {
            expect(order.index).toBeDefined();
        })
        it('should have a user orders method', async () => {
            expect(order.userOrders).toBeDefined();
        })
        it('should have a open order method', async () => {
            expect(order.userOrder).toBeDefined();
        })
        it('should have a update method', async () => {
            expect(order.update).toBeDefined();
        })
        it('should have a delete method', async () => {
            expect(order.delete).toBeDefined();
        })
        it('should have a add product method', async () => {
            expect(order.addProduct).toBeDefined();
        })
    })

    describe('Test creating new order', () => {
        const o:  Omit<Order, "order_status"> = {
            id: 1,
            user_id: '1'
        };

        it('should create new order', async () => {
            const data = await order.create(o);
            expect(data.id).toEqual(o.id);
        });
    });

    describe('Test for listing orders', () => {
        it('should list all orders', async () => {
            const data = await order.index();
            expect(data.length).toEqual(1);
        })

        it('should list all completed orders from a user', async () => {
            const id: string = '1'
            const data = await order.userOrders(id);
            if (data.length >= 1) {
                expect(data.length).toEqual(1)
            }
            expect(data).toEqual([]);
        })

        it('should list an active order of the user', async () => {
            const id: string = '1'
            const data = await order.userOrder(id)
            expect(data.user_id).toEqual(id)
        })
    });

    describe('Test for adding a product to an Order', () => {
        const order_product: OrderProduct= {
            id: 1,
            order_id: '1',
            product_id: '1',
            quantity: 20
        }

        it(`should add a product to an order`, async () => {
            const data = await order.addProduct(order_product);
            expect(data.order_id).toEqual(order_product.order_id)
        })
    })

    describe('Test update orders', () => {
        const id: string = '1';

        it('should update an order to complete status', async () => {
            const data = await order.update(id);
            console.log(`data from update ${data}`);
            
            expect(data.order_status).toEqual('complete');
        });
    });
    
    describe('Test delete orders', () => {
        const id: string = '1';
        it('should delete an order', async () => {
            const data = await order.delete(id);
            expect(data.id).toEqual(Number(id));
        });
    });
});