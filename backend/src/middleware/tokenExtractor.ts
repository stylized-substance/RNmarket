import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isString, isBoolean } from '#src/utils/typeNarrowers';
import { JwtPayload } from 'jsonwebtoken';

const secret: string | undefined = process.env.JSONWEBTOKENSECRET;

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // Skip checking for access token if adding non-admin user to database
  if (req.originalUrl === '/api/users/' && req.body.isadmin === false) {
    console.log('here');
    next();
    return;
  }

  // Handle missing JWT secret environment variable
  if (!secret || !isString(secret)) {
    throw new Error('tokenExtractor: JSONWEBTOKENSECRET is missing');
  }

  const authorization: string | undefined = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.accessToken = authorization.substring(7);
    const verifiedToken: JwtPayload | string = jwt.verify(
      req.accessToken,
      secret
    );
    req.verifiedToken = verifiedToken
    if (!verifiedToken) {
      return res.status(401).send('Invalid access token in request');
    }

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
