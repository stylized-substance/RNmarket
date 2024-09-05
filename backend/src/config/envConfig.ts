import dotenv from 'dotenv';
import { isString, parseString, parseNumber } from '#src/utils/typeNarrowers';

// Use dotenv to set environment variables if they aren't already defined
const envVariables = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWTACCESSTOKENEXPIRATION: process.env.JWTACCESSTOKENEXPIRATION,
  JWTREFRESHTOKENEXPIRATION: process.env.JWTREFRESHTOKENEXPIRATION,
  JWTACCESSTOKENSECRET: process.env.JWTACCESSTOKENSECRET,
  JWTREFRESHSECRET: process.env.JWTREFRESHSECRET,
};

const allVariablesDefined = Object.values(envVariables).every((variable) => {
  return variable !== undefined && isString(variable);
});

if (!allVariablesDefined) {
  dotenv.config();
}

for (const variable of Object.keys(envVariables)) {
  if (variable === undefined || !isString(variable)) {
    console.log(
      `Environment variable ${variable} missing or not a string, exiting.`
    );
    process.exit();
  } else {
    variable
  }
}
const authConfig = {
  jwtAccessTokenExpiration: parseNumber(process.env.JWTACCESSTOKENEXPIRATION),
  jwtRefreshTokenExpiration: parseNumber(process.env.JWTREFRESHTOKENEXPIRATION),
  jwtAccessTokenSecret: parseString(process.env.JWTACCESSTOKENSECRET),
  jwtRefreshTokenSecret: parseString(process.env.JWTREFRESHSECRET)
};

const PORT = process.env.PORT

const DATABASE_URL: string = parseString(process.env.DATABASE_URL);

export { authConfig, PORT, DATABASE_URL };
