import express from 'express';
import path from 'path';
import productsRouter from './routes/products';
import { connectToDatabase } from './utils/database';

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api/products', productsRouter);

const PORT = 3003;

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
