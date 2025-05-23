import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import logger from '#src/utils/logger';
import path from 'path';
import envVariables from '#src/config/envConfig';

const dbUrl = envVariables.DATABASE_URL;

const migrationsFolder = path.join(__dirname, '../migrations');

logger('Database URL:', dbUrl);

if (!dbUrl?.startsWith('postgres')) {
  throw new Error('Invalid database URL, connection will not work.');
}

const sequelize = new Sequelize(`${dbUrl}`, {
  logging: (msg) => logger(msg)
});

// Disable migration logging while running tests
const migrationConfig = {
  migrations: {
    glob: `${migrationsFolder}/*.{js,ts}`
  },

  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: process.env.NODE_ENV?.startsWith('test') ? undefined : console
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  try {
    const migrations = await migrator.up();
    logger(
      'Database migrations done',
      JSON.stringify(
        {
          files: migrations.map((migration) => migration.name)
        },
        null,
        2
      )
    );
  } catch (error) {
    logger('Error while running database migrations:', error);
  }
};

// Revert all migrations
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down({ to: 0 });
};

const dropAllTables = async () => {
  logger('Dropping all database tables');
  await sequelize.authenticate();
  await sequelize.drop({ cascade: true });
};

const connectToDatabase = async () => {
  await sequelize.authenticate();
  await runMigrations();
  logger('Connected to PostgreSQL');
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
