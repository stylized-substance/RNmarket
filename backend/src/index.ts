import express from 'express';
import 'express-async-errors';
import path from 'path';
import productsRouter from '#src/routes/products';
import { connectToDatabase } from '#src/utils/database';
import errorHandler from './utils/errorHandler';

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api/products', productsRouter);

app.use(errorHandler);

const PORT = 3003;

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
