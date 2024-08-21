import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isString, isBoolean } from '#src/utils/typeNarrowers';
import { JwtPayload } from 'jsonwebtoken';

const secret: string | undefined = process.env.JSONWEBTOKENSECRET;

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // Skip checking for access token if adding non-admin user to database
  if (req.originalUrl === '/api/users/' && req.body.isadmin === false) {
    next();
    return;
  }

  // Handle missing JWT secret environment variable
  if (!secret || !isString(secret)) {
    throw new Error('tokenExtractor: JSONWEBTOKENSECRET is missing');
  }

  const authorization: string | undefined = req.get('authorization');

  // Verify access token or send error if it's missing from request
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Attach access token to request
    req.accessToken = authorization.substring(7);

    const verifiedToken: JwtPayload | string = jwt.verify(
      req.accessToken,
      secret
    );

    // Attach verified token contents to request
    req.verifiedToken = verifiedToken
    if (!verifiedToken) {
      return res.status(401).send('Invalid access token in request');
    }

    // Attach isadmin property to request
    if (!isString(verifiedToken) && isBoolean(verifiedToken.isadmin)) {
      req.isadmin = verifiedToken.isadmin;
    }
  } else {
    return res.status(401).send('Access token missing from request');
  }

  next();
  return;
};

export default tokenExtractor;
