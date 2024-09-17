import express from 'express';
import 'express-async-errors';
import path from 'path';
import productsRouter from '#src/routes/products';
import usersRouter from '#src/routes/users';
import reviewsRouter from '#src/routes/reviews';
import authorizationRouter from '#src/routes/authorization';
import ordersRouter from '#src/routes/orders';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api/products', productsRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use('/api/authorization', authorizationRouter);

app.use('/api/orders', ordersRouter);

app.use(errorHandler);

export default app;
