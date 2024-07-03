import express from 'express';
import path from 'path'
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/images', express.static(path.join(__dirname, 'data/images')));

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
