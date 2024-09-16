import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import envVariables from '#src/config/envConfig';

const dbUrl = envVariables.DATABASE_URL;

console.log('Database URL:', dbUrl);

//Disable Sequelize and Umzug logging while running tests
const logging = process.env.NODE_ENV === 'test' ? false : console.log;

const sequelize = new Sequelize(`${dbUrl}`, { logging });


const migrationConfig = {
  migrations: {
    glob: 'src/migrations/*.ts'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: process.env.NODE_ENV === 'test' ? undefined : console
};

// Disable migration logging while running tests
const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  if (process.env.NODE_ENV !== 'test') {
    console.log('Database migrations done', {
      files: migrations.map((migration) => migration.name)
    });
  }
};

// Revert all migrations
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down({ to: 0});
};

const dropAllTables = async () => {
  console.log('Dropping all DB tables');
  await sequelize.authenticate();
  await sequelize.drop();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.log('Failed to connect to PostgreSQL, error:', error);
  }

  return null;
};

const closeDatabaseConnection = async () => {
  await sequelize.close();
};

export {
  connectToDatabase,
  closeDatabaseConnection,
  rollbackMigration,
  sequelize,
  dropAllTables,
  runMigrations
};
