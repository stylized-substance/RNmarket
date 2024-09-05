import dotenv from 'dotenv';
import { parseString, parseNumber } from '#src/utils/typeNarrowers';

// Use dotenv to set environment variables if they aren't already defined
const envVariables = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWTACCESSTOKENEXPIRATION: process.env.JWTACCESSTOKENEXPIRATION,
  JWTREFRESHTOKENEXPIRATION: process.env.JWTREFRESHTOKENEXPIRATION,
  JWTACCESSTOKENSECRET: process.env.JWTACCESSTOKENSECRET,
  JWTREFRESHSECRET: process.env.JWTREFRESHSECRET
};

const allVariablesDefined: boolean = Object.values(envVariables).every((variable) => variable !== undefined);

if (!allVariablesDefined) {
  dotenv.config();
}

for (const variable of Object.values(envVariables)) {
  if (variable === undefined) {
    console.log(`Environment variable ${variable} missing, exiting.`);
    process.exit();
  }
}

const authConfig = {
  jwtAccessTokenExpiration: parseNumber(process.env.JWTACCESSTOKENEXPIRATION),
  jwtRefreshTokenExpiration: parseNumber(process.env.JWTREFRESHTOKENEXPIRATION),
  jwtAccessTokenSecret: parseString(process.env.JWTACCESSTOKENSECRET),
  jwtRefreshTokenSecret: parseString(process.env.JWTREFRESHSECRET)
};

const PORT: number = parseNumber(process.env.PORT);

const DATABASE_URL: string = parseString(process.env.DATABASE_URL);

export { authConfig, PORT, DATABASE_URL };
