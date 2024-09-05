import app from './app';
import { connectToDatabase } from '#src/utils/database';
import envVariables from '#src/config/envConfig';

const listeningPort = envVariables.PORT

const start = async () => {
  await connectToDatabase();
  app.listen(listeningPort, () => {
    console.log(`Server running on port ${envVariables.PORT}`);
  });
};

start();