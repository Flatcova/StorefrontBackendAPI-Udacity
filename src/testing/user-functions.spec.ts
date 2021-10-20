import { Users } from "../models/users"
import { User } from "../types";

const user = new Users();

describe('ALL USER TESTS', () => {
    describe('User methods', () => {
        it('should have a create method', async () => {
            expect(user.create).toBeDefined();
        })
        it('should have a index method', async () => {
            expect(user.index).toBeDefined();
        })
        it('should have a show method', async () => {
            expect(user.show).toBeDefined();
        })
    })
    describe('Test for user creation', () => {
        const u: User = {
            id: 1,
            firstName: 'Marwio',
            lastName: 'Riows',
            password: 'testing1q23'
        }

    it('should create a new user', async () => {
        const data = await user.create(u);
        expect(data.firstName).toEqual(u.firstName);
    })

    it('should authenticate the user', async () => {
        const data = await user.authenticate(u)
        expect(data).toBeTruthy;
    })
    });

    describe('Test for show user data', () => {
        const id: string = '1';

        it('should return all users', async () => {
            const data = await user.index();
            expect(data).toContain(jasmine.objectContaining({}));
        });

        it('should return an specific user', async () => {
            const data = await user.show(id);
            expect(data.id).toEqual(Number(id));
        })
    });    
});