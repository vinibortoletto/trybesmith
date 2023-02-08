import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const idSchema = Joi.number();

const schema = Joi.object({
  productsIds: Joi.array()
    .items(idSchema)
    .required(),
});

export default function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const { productsIds } = req.body;
  const statusCode = productsIds === undefined ? 400 : 422;
  const { error } = schema.validate({ productsIds });

  if (error) {
    return res.status(statusCode).json({ message: error.message });
  }

  if (productsIds.length === 0) {
    return res.status(statusCode).json({ message: '"productsIds" must include only numbers' });
  }
  next();
}
