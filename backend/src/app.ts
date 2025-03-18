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

const productsRoute = process.env.NODE_ENV === 'production' ? '/products' : '/api/products';
const usersRoute = process.env.NODE_ENV === 'production' ? '/users' : '/api/users';
const reviewsRoute = process.env.NODE_ENV === 'production' ? '/reviews' : '/api/reviews';
const authorizationRoute = process.env.NODE_ENV === 'production' ? '/authorization' : '/api/authorization';
const ordersRoute = process.env.NODE_ENV === 'production' ? '/orders' : '/api/orders';
const checkoutRoute = process.env.NODE_ENV === 'production' ? '/checkout' : '/api/checkout';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/data/images', express.static('data/images'));

app.use(productsRoute, productsRouter);

app.use(usersRoute, usersRouter);

app.use(reviewsRoute, reviewsRouter);

app.use(authorizationRoute, authorizationRouter);

app.use(ordersRoute, ordersRouter);

app.use(checkoutRoute, checkoutRouter);

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
