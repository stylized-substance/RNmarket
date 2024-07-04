import { Sequelize } from 'sequelize';
// import { Umzug, SequelizeStorage } from 'umzug';

const DATABASE_URL = process.env.DATABASE_URL;
console.log('URL', DATABASE_URL);

const sequelize = new Sequelize(`${DATABASE_URL}`);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    //await runMigrations()
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.log('Failed to connect to PostgreSQL, error:', error);
    process.exit(1);
  }

  return null;
};

export { connectToDatabase };
