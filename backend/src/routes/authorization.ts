import authConfig from '#src/config/authConfig';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { RefreshToken as RefreshTokenModel } from '#src/models';
import { User, RefreshToken } from '#src/types/types';
import { parseString } from '#src/utils/typeNarrowers';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

// Import JWT secrets from config file
const jwtAccessTokenSecret: string = parseString(
  authConfig.jwtAccessTokenSecret
);
const jwtRefreshTokenSecret: string = parseString(
  authConfig.jwtRefreshTokenSecret
);

// Handle missing JWT secrets
if (!jwtAccessTokenSecret || !jwtRefreshTokenSecret) {
  throw new Error('Missing JWT secret');
}

// Interface for payload to send to client when logging in
interface Payload {
  username: string;
  name: string;
  id: string;
  isadmin: boolean;
  accessToken: string;
  refreshToken: string;
}

// Function for creating JWT tokens
const createJWTTokens = (
  user: User
): { refreshTokenForDb: RefreshToken; accessToken: string } => {
  // Create access token
  const accessToken: string = jwt.sign(user, jwtAccessTokenSecret, {
    expiresIn: authConfig.jwtAccessTokenExpiration
  });

  // Create refresh token
  const refreshToken: string = jwt.sign(user, jwtRefreshTokenSecret, {
    expiresIn: authConfig.jwtRefreshTokenExpiration
  });

  // Set expiry time for refresh token
  const refreshTokenExpiryTime: number =
    new Date().getTime() + authConfig.jwtRefreshTokenExpiration * 1000; // Convert seconds to milliseconds

  // Create refresh token object for saving to databasew
  const refreshTokenForDb: RefreshToken = {
    id: uuidv4(),
    token: refreshToken,
    expiry_date: refreshTokenExpiryTime,
    user_id: user.id
  };

  return { refreshTokenForDb, accessToken };
};

// Login user
router.post('/login', async (req: Request, res: Response) => {
  const username: string | null = req.body.username
    ? parseString(req.body.username)
    : null;

  const password: string | null = req.body.password
    ? parseString(req.body.password)
    : null;

  if (!username) {
    return res.status(400).json({ Error: 'Username missing from request' });
  }

  if (!password) {
    return res.status(400).json({ Error: 'Password missing from request' });
  }

  // Get user from database
  const user: UserModel | null = await UserModel.findOne({
    where: {
      username: username
    }
  });

  if (!user) {
    return res.status(400).json({ Error: 'User not found in database' });
  }

  // If password hash is null in database, send error. Else send access token and refresh token
  if (user.dataValues.passwordhash === null) {
    return res.status(500).json({ Error: 'User has no password set' });
  }

  const passwordCorrect: boolean = await bcrypt.compare(
    password,
    user.dataValues.passwordhash
  );

  if (!passwordCorrect) {
    return res.status(401).json({ Error: 'Incorrect password' });
  }

  // Create JWT tokens
  const accessToken = createJWTTokens(user.dataValues).accessToken;
  const refreshTokenObject = createJWTTokens(user.dataValues).refreshTokenForDb;

  // Save refresh token to database
  await RefreshTokenModel.create(refreshTokenObject);

  // Create response payload to send to client
  const payload: Payload = {
    username: user.dataValues.username,
    name: user.dataValues.name,
    id: user.dataValues.id,
    isadmin: user.dataValues.isadmin,
    accessToken: accessToken,
    refreshToken: refreshTokenObject.token
  };

  // Send payload to client
  return res.status(200).json({ payload });
});

router.post('/refresh', async (req: Request, res: Response) => {
  // Refresh access token for user
  const refreshToken: string = parseString(req.body.refreshToken);

  if (!refreshToken) {
    return res
      .status(400)
      .json({ Error: 'Refresh token missing from request' });
  }

  // Find existing refresh token in database, send error if not found
  const tokenInDb: RefreshTokenModel | null = await RefreshTokenModel.findOne({
    where: {
      token: refreshToken
    }
  });

  if (!tokenInDb) {
    return res
      .status(400)
      .json({ Error: 'Refresh token not found in database' });
  }

  // Check if refresh token has expired, delete it and send error if true
  const currentDate = new Date();
  if (tokenInDb.dataValues.expiry_date.getTime() < currentDate.getTime()) {
    await tokenInDb.destroy();
    return res
      .status(400)
      .json({ Error: 'Refresh token has expired, login again' });
  }

  // Send error if user corresponding to refresh token not found in database
  const userInDb: UserModel | null = await UserModel.findByPk(
    tokenInDb.dataValues.user_id
  );

  if (!userInDb) {
    return res.status(400).json({ Error: `User doesn't exist in database` });
  }

  // Create new access token and send to client
  const newAccessToken = createJWTTokens(userInDb.dataValues).accessToken;
  return res.status(201).json({ accessToken: newAccessToken });
});

export default router;
