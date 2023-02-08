import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const stringSchema = Joi.string().min(3).required();

const schema = Joi.object({
  username: stringSchema,
  vocation: stringSchema,
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

export default function validateUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const { error } = schema.validate(req.body);

  const userKeys = Object.keys(req.body);
  const keys = ['username', 'level', 'vocation', 'password'];
  const hasAllKeys = keys.every((key) => userKeys.includes(key));

  const statusCode = !hasAllKeys ? 400 : 422;

  if (error) {
    return res.status(statusCode).json({ message: error.message });
  }
  
  next();
}
