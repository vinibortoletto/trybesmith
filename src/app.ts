import express from 'express';
import OrderController from './controllers/Order.controller';
import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';

const app = express();

const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

app.use(express.json());

app.post('/products', productController.create);
app.get('/products', productController.findAll);

app.post('/users', userController.create);
app.get('/orders', orderController.findAll);

export default app;
