import dotenv from 'dotenv';
import { parseString, parseNumber } from '#src/utils/typeNarrowers';

interface EnvVariables {
  PORT: number;
  DATABASE_URL: string;
  JWTACCESSTOKENEXPIRATION: number;
  JWTREFRESHTOKENEXPIRATION: number;
  JWTACCESSTOKENSECRET: string;
  JWTREFRESHTOKENSECRET: string;
}

let envVariables: EnvVariables = {
  PORT: process.env.PORT ? parseNumber(process.env.PORT) : 0,
  DATABASE_URL: process.env.DATABASE_URL
    ? parseString(process.env.DATABASE_URL)
    : '',
  JWTACCESSTOKENEXPIRATION: process.env.JWTACCESSTOKENEXPIRATION
    ? parseNumber(process.env.JWTACCESSTOKENEXPIRATION)
    : 0,
  JWTREFRESHTOKENEXPIRATION: process.env.JWTREFRESHTOKENEXPIRATION
    ? parseNumber(process.env.JWTREFRESHTOKENEXPIRATION)
    : 0,
  JWTACCESSTOKENSECRET: process.env.JWTACCESSTOKENSECRET
    ? parseString(process.env.JWTACCESSTOKENSECRET)
    : '',
  JWTREFRESHTOKENSECRET: process.env.JWTREFRESHTOKENSECRET
    ? parseString(process.env.JWTREFRESHTOKENSECRET)
    : ''
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
    PORT: parseNumber(process.env.PORT),
    DATABASE_URL: parseString(process.env.DATABASE_URL),
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

// Use dotenv to set environment variables if they aren't already defined
if (!allVariablesDefined) {
  dotenv.config()
  for (const variable of Object.keys(envVariables)) {
    if (!variableDefined(process.env[variable])) {
      console.log(
        `Environment variable ${variable} missing, exiting. Are you missing an .env file at project root or did you forget to set some variable?`
      );
      process.exit();
    }
  }
  envVariables = reassign();
}

console.log('Environment variables:\n', envVariables);

export default envVariables;