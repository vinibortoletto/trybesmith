import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'Secret';

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const user = jwt.verify(token, secret);
    req.body.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid token' });
  }
}
