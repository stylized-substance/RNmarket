import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '#src/config/authConfig';
import { JwtPayload } from 'jsonwebtoken';
import { parseString } from '#src/utils/typeNarrowers';

// Import JWT secrets from config file
const jwtAccessTokenSecret: string = parseString(
  authConfig.jwtAccessTokenSecret
);
const jwtRefreshTokenSecret: string = parseString(
  authConfig.jwtRefreshTokenSecret
);

// Handle missing JWT secrets
if (
  !jwtAccessTokenSecret ||
  !jwtRefreshTokenSecret
) {
  throw new Error('Missing JWT secret');
}

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // Skip checking for access token if adding non-admin user to database
  if (req.originalUrl === '/api/users/' && req.body.isadmin === false) {
    next();
    return;
  }

  const authorization: string | undefined = req.get('authorization');

  // Verify access token or send error if it's missing from request
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Attach access token to request
    req.accessToken = authorization.substring(7);

    // Verify access token
    const verifiedToken: JwtPayload | string = jwt.verify(
      req.accessToken,
      jwtAccessTokenSecret
    );

    // Attach verified token contents to request
    req.verifiedToken = verifiedToken;

    if (!verifiedToken) {
      return res.status(401).json({ Error: 'Invalid access token in request'});
    }
  } else {
    return res.status(401).json({ Error: 'Access token missing from request'});
  }

  next();
  return;
};

export default tokenExtractor;
