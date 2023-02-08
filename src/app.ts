import express from 'express';

import {
  OrderController,
  UserController,
  ProductController,
} from './controllers';

import { validateLogin, validateProducts, validateUser } from './middleware';

const app = express();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.use(express.json());

app.post('/products', validateProducts, productController.create);
app.get('/products', productController.findAll);

app.post('/users', validateUser, userController.create);
app.get('/orders', orderController.findAll);

app.post('/login', validateLogin, userController.login);

export default app;
