import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { RefreshToken as RefreshTokenModel } from '#src/models';
import { parseString } from '#src/utils/typeNarrowers';
import createJWTTokens from '#src/utils/createJWTTokens';
import { LoginPayload } from '#src/types/types'

const router: Router = Router();

// Interface for payload to send to client when logging in


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
  const payload: LoginPayload = {
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
