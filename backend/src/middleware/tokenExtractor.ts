import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isString } from '#src/utils/typeNarrowers'

const secret: string | undefined = process.env.JSONWEBTOKENSECRET;

const tokenExtractor = (req: Request, res: Response, next: NextFunction) => {
  // Handle missing JWT secret env variable
  if (!secret || !isString(secret)) {
    throw new Error('tokenExtractor: JSONWEBTOKENSECRET is missing');
  }

  const authorization: string | undefined = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.accessToken = authorization.substring(7)
    if (!jwt.verify(req.accessToken, secret)) {
      return res.status(401).send('Invalid access token in request')
    } else {
      return res.status(401).send('Access token missing from request')
    }
  }
  next()
  return
}

export default tokenExtractor