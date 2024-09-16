import app from './app';
import { connectToDatabase } from '#src/utils/database';
import envVariables from '#src/config/envConfig';
import logger from '#src/utils/logger'

const listeningPort = envVariables.PORT

const start = async () => {
  await connectToDatabase();
  app.listen(listeningPort, () => {
    logger(`Server running on port ${envVariables.PORT}`);
  });
};

start();