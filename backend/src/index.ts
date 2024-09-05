import app from './app';
import { connectToDatabase } from '#src/utils/database';
import { PORT } from './config/envConfig';

const listeningPort = PORT

const start = async () => {
  await connectToDatabase();
  app.listen(listeningPort, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();