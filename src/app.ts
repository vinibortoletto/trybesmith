import express from 'express';
import { loginRouter, ordersRouter, productsRouter, usersRouter } from './routers';

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/orders', ordersRouter);

export default app;
