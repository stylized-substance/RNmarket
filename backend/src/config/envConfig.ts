import { parseString, parseNumber } from '#src/utils/typeNarrowers';
import logger from '#src/utils/logger';

interface EnvVariables {
  PORT: number;
  DATABASE_URL: string;
  JWTACCESSTOKENEXPIRATION: number;
  JWTREFRESHTOKENEXPIRATION: number;
  JWTACCESSTOKENSECRET: string;
  JWTREFRESHTOKENSECRET: string;
}

const setDatabaseUrl = () => {
  if (!process.env.NODE_ENV) {
    return 'postgres://dummy:dummy@dummy:5432/postgres';
  }

  if (process.env.NODE_ENV === 'test') {
    return 'postgres://postgres:dbpassword@localhost:5432/postgres';
  }

  return process.env.DATABASE_URL;
};

let envVariables: EnvVariables = {
  PORT: process.env.PORT ? parseNumber(Number(process.env.PORT)) : 3003,
  DATABASE_URL: parseString(setDatabaseUrl()),
  JWTACCESSTOKENEXPIRATION: process.env.JWTACCESSTOKENEXPIRATION
    ? parseNumber(Number(process.env.JWTACCESSTOKENEXPIRATION))
    : 3600,
  JWTREFRESHTOKENEXPIRATION: process.env.JWTREFRESHTOKENEXPIRATION
    ? parseNumber(Number(process.env.JWTREFRESHTOKENEXPIRATION))
    : 86400,
  JWTACCESSTOKENSECRET: process.env.JWTACCESSTOKENSECRET
    ? parseString(process.env.JWTACCESSTOKENSECRET)
    : 'accesssecret',
  JWTREFRESHTOKENSECRET: process.env.JWTREFRESHTOKENSECRET
    ? parseString(process.env.JWTREFRESHTOKENSECRET)
    : 'refreshsecret'
};

const variableDefined = (variable: unknown): boolean => {
  return (
    variable !== undefined &&
    variable !== 'NaN' &&
    variable !== '' &&
    variable !== 0
  );
};

const allVariablesDefined: boolean = Object.values(envVariables).every(
  (variable) => variableDefined(variable)
);

const reassign = (): EnvVariables => {
  return {
    PORT: parseNumber(Number(process.env.PORT)),
    DATABASE_URL: parseString(setDatabaseUrl()),
    JWTACCESSTOKENEXPIRATION: parseNumber(
      Number(process.env.JWTACCESSTOKENEXPIRATION)
    ),
    JWTREFRESHTOKENEXPIRATION: parseNumber(
      Number(process.env.JWTREFRESHTOKENEXPIRATION)
    ),
    JWTACCESSTOKENSECRET: parseString(process.env.JWTACCESSTOKENSECRET),
    JWTREFRESHTOKENSECRET: parseString(process.env.JWTREFRESHTOKENSECRET)
  };
};

// Use dotenv to set environment variables if they aren't already defined and if not running in production
if (!allVariablesDefined) {
  if (process.env.NODE_ENV !== 'production') {
    import('dotenv').then((dotenv) => dotenv.config());
    envVariables = reassign();
  }

  for (const variable of Object.keys(envVariables) as Array<
    keyof EnvVariables
  >) {
    if (!variableDefined(envVariables[variable])) {
      logger(
        `Environment variable ${variable} missing, exiting. Are you missing an .env file at project root or did you forget to set some variable?`
      );
      process.exit();
    }
  }
}

logger('Environment variables:\n', JSON.stringify(envVariables, null, 2));

export default envVariables;
