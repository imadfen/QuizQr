import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: Record<string, any>;
}

export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    const secretKey = process.env.SECRET_KEY || '';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded as Record<string, any>;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
