import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1] || ' ';
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || '');    
    res.locals.auth =decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
