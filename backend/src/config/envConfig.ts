import dotenv from 'dotenv';
import { parseString, parseNumber } from '#src/utils/typeNarrowers';

interface EnvVariables {
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
  JWTACCESSTOKENEXPIRATION: number | undefined;
  JWTREFRESHTOKENEXPIRATION: number | undefined;
  JWTACCESSTOKENSECRET: string | undefined;
  JWTREFRESHTOKENSECRET: string | undefined;
}

// Use dotenv to set environment variables if they aren't already defined
const envVariables: EnvVariables = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  JWTACCESSTOKENEXPIRATION: Number(process.env.JWTACCESSTOKENEXPIRATION),
  JWTREFRESHTOKENEXPIRATION: Number(process.env.JWTREFRESHTOKENEXPIRATION),
  JWTACCESSTOKENSECRET: process.env.JWTACCESSTOKENSECRET,
  JWTREFRESHTOKENSECRET: process.env.JWTREFRESHSECRET
};

const allVariablesDefined: boolean = Object.values(envVariables).every(
  (variable) => variable !== undefined
);

if (!allVariablesDefined) {
  dotenv.config();
  envVariables.PORT = parseNumber(process.env.PORT);
  envVariables.DATABASE_URL = parseString(process.env.DATABASE_URL);
  envVariables.JWTACCESSTOKENEXPIRATION = parseNumber(
    Number(process.env.JWTACCESSTOKENEXPIRATION)
  );
  envVariables.JWTREFRESHTOKENEXPIRATION = parseNumber(
    Number(process.env.JWTREFRESHTOKENEXPIRATION)
  );
  envVariables.JWTACCESSTOKENSECRET = parseString(
    process.env.JWTACCESSTOKENSECRET
  );
  envVariables.JWTREFRESHTOKENSECRET = parseString(process.env.JWTREFRESHTOKENSECRET);
}


console.log('Environment variables:\n', envVariables);

for (const [key, value] of Object.entries(envVariables)) {
  if (value === undefined || value === 'NaN') {
    console.log(`Environment variable ${key} missing, exiting.`);
    process.exit();
  }
}

export default envVariables
