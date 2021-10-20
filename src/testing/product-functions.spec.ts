import { ProdcutStore } from "../models/products";
import { Products, User } from "../types";

const product = new ProdcutStore();

describe('ALL PRODUCTS TESTS', () => {

    describe('Product methods', () => {
        it('should have a create method', async () => {
            expect(product.create).toBeDefined();
        })
        it('should have a index method', async () => {
            expect(product.index).toBeDefined();
        })
        it('should have a show method', async () => {
            expect(product.show).toBeDefined();
        })
        it('should have a top 5 method', async () => {
            expect(product.top).toBeDefined();
        })
        it('should have a by category method', async () => {
            expect(product.category).toBeDefined();
        })
        it('should have a update method', async () => {
            expect(product.update).toBeDefined();
        })
        it('should have a delete method', async () => {
            expect(product.delete).toBeDefined();
        })
    })

    describe('Test creating products', () => {
        const p: Products = {
            id: 1,
            name: 'AWS-Basics',
            price: 9.99,
            category: 'book'
        };

        it('should create new product', async () => {
            const data = await product.create(p);
            expect(data.name).toEqual(p.name);
        });
    });

    describe('Test for listing products', () => {
        it('should list all products', async () => {
            const data = await product.index();
            expect(data).toContain(jasmine.objectContaining({}));
        })

        it('should list a product', async () => {
            const id: string = '1'
            const data = await product.show(id);
            expect(data.id).toEqual(Number(id));
        })

        it('should list top 5 products', async () => {
            const data = await product.top()
            expect(data).toContain(jasmine.objectContaining({}));;
        })
        it('should list all products within the same category', async () => {
            const category: string = 'book';
            const data = await product.category(category)
            expect(data).toContain(jasmine.objectContaining({}));;
        })
    });
    
    describe('Test delete products', () => {
        const id: string = '1';

        it('should delete a product', async () => {
            const data = await product.delete(id);
            expect(data.id).toEqual(Number(id));
        });
    });
});