import express from 'express';
import 'express-async-errors';
import productsRouter from '#src/routes/products';
import usersRouter from '#src/routes/users';
import reviewsRouter from '#src/routes/reviews';
import authorizationRouter from '#src/routes/authorization';
import ordersRouter from '#src/routes/orders';
import checkoutRouter from '#src/routes/checkout';
import errorHandler from './utils/errorHandler';
import cors from 'cors';
import { connectToDatabase } from '#src/utils/database';
import envVariables from '#src/config/envConfig';
import logger from '#src/utils/logger';

const listeningPort = envVariables.PORT;

const productsRoute =
  process.env.NODE_ENV === 'production' ? '/products' : '/api/products';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/data/images', express.static('data/images'));

app.use(productsRoute, productsRouter);

app.use('/api/users', usersRouter);

app.use('/api/reviews', reviewsRouter);

app.use('/api/authorization', authorizationRouter);

app.use('/api/orders', ordersRouter);

app.use('/api/checkout', checkoutRouter);

app.use(errorHandler);

// Connect to database
(async () => {
  await connectToDatabase();
})();

app.listen(listeningPort, () => {
  logger(`Server running on port ${envVariables.PORT}`);
});

export default app;

// Export for node
export { app };
