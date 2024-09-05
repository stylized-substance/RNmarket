import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import envVariables from '#src/config/envConfig';

const dbUrl = envVariables.DATABASE_URL;

console.log('Database URL:', dbUrl);

const sequelize = new Sequelize(`${dbUrl}`);

const migrationConfig = {
  migrations: {
    glob: 'src/migrations/*.ts'
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  console.log('Database migrations done', {
    files: migrations.map((migration) => migration.name)
  });
};

const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConfig);
  await migrator.down();
};

const dropAllTables = async () => {
  await sequelize.authenticate();
  await sequelize.dropAllSchemas({})
}

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

export { connectToDatabase, rollbackMigration, sequelize, dropAllTables };
