import jwt from 'jsonwebtoken';
import { User } from '../types';
const { TOKEN_SECRET } = process.env;

describe('Testing Token', ()=> {
    const USER: User = {
        id: 1,
        firstName: "Marwio",
        lastName: "Riows",
        password: "testing1q23",
      };
    it('shold return a token', () => {
        const TOKEN = jwt.sign({ user: USER }, TOKEN_SECRET || "devs");
        expect(TOKEN).not.toBeNull()
    })
})
