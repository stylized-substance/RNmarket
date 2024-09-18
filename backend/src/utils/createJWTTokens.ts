import jwt from 'jsonwebtoken';
import { User, RefreshToken } from '#src/types/types';
import { v4 as uuidv4 } from 'uuid';

// Import JWT secrets from config file
import envVariables from '#src/config/envConfig';

const jwtAccessTokenSecret = envVariables.JWTACCESSTOKENSECRET;
const jwtRefreshTokenSecret = envVariables.JWTREFRESHTOKENSECRET;

// Function for creating JWT tokens
const createJWTTokens = (
  user: User
): { refreshTokenForDb: RefreshToken; accessToken: string } => {
  // Create access token
  const accessToken: string = jwt.sign(user, jwtAccessTokenSecret, {
    expiresIn: envVariables.JWTACCESSTOKENEXPIRATION
  });

  // Create refresh token
  const refreshToken: string = jwt.sign(user, jwtRefreshTokenSecret, {
    expiresIn: envVariables.JWTREFRESHTOKENEXPIRATION
  });

  // Set expiry time for refresh token
  const refreshTokenExpiryTime: number =
    (new Date().getTime() + envVariables.JWTREFRESHTOKENEXPIRATION) * 1000; // Convert seconds to milliseconds

  // Create refresh token object for saving to databasew
  const refreshTokenForDb: RefreshToken = {
    id: uuidv4(),
    token: refreshToken,
    expiry_date: refreshTokenExpiryTime,
    user_id: user.id
  };

  return { refreshTokenForDb, accessToken };
};

export default createJWTTokens