import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import envVariables from '#src/config/envConfig';
import logger from '#src/utils/logger';

const dbUrl = envVariables.DATABASE_URL;

logger('Database URL:', dbUrl);

const sequelize = new Sequelize(`${dbUrl}`, { logging: (msg) => logger(msg) });

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
  logger('Database migrations done', {
    files: migrations.map((migration) => migration.name)
  });
};

// Revert all migrations
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down({ to: 0 });
};

const dropAllTables = async () => {
  logger('Dropping all DB tables');
  await sequelize.authenticate();
  await sequelize.drop();
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    logger('Connected to PostgreSQL');
  } catch (error) {
    logger('Failed to connect to PostgreSQL, error:', error);
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
