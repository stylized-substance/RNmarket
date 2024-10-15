import express from 'express';
import 'express-async-errors';
import productsRouter from '#src/routes/products';
import usersRouter from '#src/routes/users';
import reviewsRouter from '#src/routes/reviews';
import authorizationRouter from '#src/routes/authorization';
import ordersRouter from '#src/routes/orders';
import checkoutRouter from '#src/routes/checkout';
import errorHandler from './utils/errorHandler';
import cors from "cors";

const app = express();

app.use(cors())

app.use(express.json());

app.use('/data/images', express.static('data/images'));

app.use('/api/products', productsRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use('/api/authorization', authorizationRouter);

app.use('/api/orders', ordersRouter);

app.use('/api/checkout', checkoutRouter);

app.use(errorHandler);

export default app;
