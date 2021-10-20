import express, { Request, Response } from 'express';
import { Users } from '../models/users';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/auth';
import { User } from '../types';

const user = new Users();

const { TOKEN_SECRET } = process.env;

const create = async (req: Request, res: Response) => {
  const data: User = {
    id: 1,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    password: req.body.password,
  };

  const newUser = await user.create(data);
  const token = jwt.sign({ user: newUser }, TOKEN_SECRET || 'devs');
  res.json(token);
};

const index = async (_req: Request, res: Response) => {
  const users = await user.index();
  res.json(users);
}

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = await user.show(id);
  res.json(data)
}

const user_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', verifyAuthToken, create);
};

export default user_routes;
