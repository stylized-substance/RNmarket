import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isString, isBoolean } from '#src/utils/typeNarrowers';
import { JwtPayload } from 'jsonwebtoken';

const secret: string | undefined = process.env.JSONWEBTOKENSECRET;

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // Handle missing JWT secret environment variable
  if (!secret || !isString(secret)) {
    throw new Error('tokenExtractor: JSONWEBTOKENSECRET is missing');
  }

  const authorization: string | undefined = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.accessToken = authorization.substring(7);
    const verifyResult: JwtPayload | string = jwt.verify(
      req.accessToken,
      secret
    );

    if (!verifyResult) {
      return res.status(401).send('Invalid access token in request');
    }

    if (!isString(verifyResult) && isBoolean(verifyResult.isadmin)) {
      req.isadmin = verifyResult.isadmin;
    }
  } else {
    return res.status(401).send('Access token missing from request');
  }

  next();
  return;
};

export default tokenExtractor;
