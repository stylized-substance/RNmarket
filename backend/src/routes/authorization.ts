import authConfig from '#src/config/authConfig';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { User } from '#src/types/types';
import { parseString } from '#src/utils/typeNarrowers';

interface Payload {
  username: string;
  name: string;
  id: string;
  isadmin: boolean;
  accessToken: string;
  refreshToken: string;
}

const router: Router = Router();

// Import JWT secrets from config file
const jwtAccessTokenSecret: string = parseString( authConfig.jwtAccessTokenSecret)
const jwtRefreshTokenSecret: string = parseString( authConfig.jwtRefreshTokenSecret)

// Handle missing JWT secrets
if (
  !jwtAccessTokenSecret ||
  !jwtRefreshTokenSecret
) {
  throw new Error('Missing JWT secret');
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
      const accessToken: string = jwt.sign(
        userJSON,
        jwtAccessTokenSecret,
        { expiresIn: authConfig.jwtAccessTokenExpiration }
      );
      const refreshToken: string = jwt.sign(
        userJSON,
        jwtRefreshTokenSecret,
        { expiresIn: authConfig.jwtRefreshTokenExpiration }
      );

      // Create response payload to send to client
      const payload: Payload = {
        username: userJSON.username,
        name: userJSON.name,
        id: userJSON.id,
        isadmin: userJSON.isadmin,
        accessToken,
        refreshToken
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
