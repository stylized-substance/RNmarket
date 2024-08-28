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

// Function for creating refresh tokens
const createRefreshToken = (user: User): RefreshToken => {
  const refreshToken: string = jwt.sign(user, jwtRefreshTokenSecret, {
    expiresIn: authConfig.jwtRefreshTokenExpiration
  });

  const expiryTime: number =
    new Date().getTime() + authConfig.jwtRefreshTokenExpiration * 1000; // Convert seconds to milliseconds

  // Create object for saving to databasew
  const objectForDb: RefreshToken = {
    id: uuidv4(),
    token: refreshToken,
    expiry_date: expiryTime,
    user_id: user.id
  };

  return objectForDb
}

// Login user
router.post('/login', async (req: Request, res: Response) => {
  const username: string | null = req.body.username
    ? parseString(req.body.username)
    : null;

  const password: string | null = req.body.password
    ? parseString(req.body.password)
    : null;

  if (!username) {
    return res.status(400).json({ Error: 'Username missing' });
  }

  if (!password) {
    return res.status(400).json({ Error: 'Password missing' });
  }

  // Get user from database
  const user: UserModel | null = await UserModel.findOne({
    where: {
      username: username
    }
  });

  if (user) {
    // Convert database response data to JSON
    const userJSON: User = user.toJSON();

    // If passwordhash is null in database, send error. Else send access token and refresh token
    if (userJSON.passwordhash !== null) {
      const passwordCorrect: boolean = await bcrypt.compare(
        password,
        userJSON.passwordhash
      );

      if (!passwordCorrect) {
        return res.status(400).json({ Error: 'Incorrect password' });
      }

      // Create JWT tokens
      const accessToken: string = jwt.sign(userJSON, jwtAccessTokenSecret, {
        expiresIn: authConfig.jwtAccessTokenExpiration
      });

      const refreshTokenObject = createRefreshToken(userJSON)
      

      // TODO: move this to 'refresh' endpoint
      // Check if user already has refresh token in database, delete it if true
      // const refreshTokenInDatabase: RefreshTokenModel | null =
      //   await RefreshTokenModel.findOne({
      //     where: {
      //       user_id: userJSON.id
      //     }
      //   });

      // if (refreshTokenInDatabase) {
      //   await refreshTokenInDatabase.destroy();
      // }

      // Save refresh token to database
      await RefreshTokenModel.create(refreshTokenObject);

      // Create response payload to send to client
      const payload: Payload = {
        username: userJSON.username,
        name: userJSON.name,
        id: userJSON.id,
        isadmin: userJSON.isadmin,
        accessToken,
        refreshToken: refreshTokenObject.token
      };

      // Send payload to client
      return res.status(200).json({ payload });
    } else {
      return res.status(500).json({ Error: 'User has no password set' });
    }
  } else {
    return res.status(400).json({ Error: 'User not found' });
  }
});

export default router;
