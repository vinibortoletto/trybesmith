import express from 'express';
import ProductController from './controllers/Product.controller';
import UserController from './controllers/User.controller';

const app = express();

const productController = new ProductController();
const userController = new UserController();

app.use(express.json());

app.post('/products', productController.create);
app.get('/products', productController.findAll);

app.post('/users', userController.create);

export default app;
