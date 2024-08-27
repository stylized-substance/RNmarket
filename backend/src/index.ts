import express from 'express';
import 'express-async-errors';
import path from 'path';
import productsRouter from '#src/routes/products';
import usersRouter from '#src/routes/users';
import reviewsRouter from '#src/routes/reviews';
import authorizationRouter from '#src/routes/authorization';
import { connectToDatabase } from '#src/utils/database';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api/products', productsRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use('/api/authorization', authorizationRouter);

app.use(errorHandler);

const PORT = 3003;

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
