import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import envVariables from '#src/config/envConfig';
import logger from '#src/utils/logger';

//
import { promises as fs } from 'fs';
import path from 'path';

const directoryPath = path.join(__dirname, '../migrations'); // Replace with your folder name
console.log('dirname', __dirname)
console.log('directoryPath', directoryPath)

async function listFiles() {
    try {
        const files = await fs.readdir(directoryPath);
        // Listing all files in the directory
        files.forEach(file => {
            console.log(file);
        });
    } catch (err) {
        console.error('Unable to scan directory: ' + err);
    }
}

listFiles();

//

const dbUrl = envVariables.DATABASE_URL;

logger('Database URL:', dbUrl);

const migrationspath = `${process.cwd()}/../migrations/*.js`
console.log('migrationspath', migrationspath)

const sequelize = new Sequelize(`${dbUrl}`, { logging: (msg) => logger(msg) });

const migrationConfig = {
  // migrations: {
  //   glob: ['*.js', {cwd: '/app/backend/build/src/migrations'}]
  // },
  migrations: {
		// glob: `${directoryPath}/*.js`,
    // glob: '/app/backend/build/src/migrations/*.{js,ts,up.sql}',
    glob: `${directoryPath}/*.{js,ts,up.sql}`,

	},
  
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: process.env.NODE_ENV === 'test' ? undefined : console
};

// Disable migration logging while running tests
const runMigrations = async () => {
  const migrator = new Umzug(migrationConfig);
  const migrations = await migrator.up();
  logger('Database migrations done', JSON.stringify({
    files: migrations.map((migration) => migration.name)
  }, null , 2));
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
