import express from 'express';
import path from 'path'
import productsRouter from './routes/products'

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/images', express.static(path.join(__dirname, 'data/images')));

app.use('/api/products', productsRouter)

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
