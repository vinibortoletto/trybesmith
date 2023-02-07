import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const stringSchema = Joi.string().min(3).required();

const schema = Joi.object({
  name: stringSchema,
  amount: stringSchema,
});

export default function validateProducts(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const { name, amount } = req.body;
  const { error } = schema.validate({ name, amount });

  const statusCode = (name === undefined || amount === undefined) ? 400 : 422;

  if (error) {
    return res.status(statusCode).json({ message: error.message });
  }

  next();
}
