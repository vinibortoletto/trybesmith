import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const stringSchema = Joi.string().min(1).required();

const schema = Joi.object({
  username: stringSchema,
  password: stringSchema,
});

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
}
