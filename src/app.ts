import express from 'express';
import ProductController from './controllers/Product.controller';

const app = express();
const productController = new ProductController();

app.use(express.json());
app.post('/products', productController.create);

export default app;
