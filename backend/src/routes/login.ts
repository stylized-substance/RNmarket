import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { User } from '#src/types/types';
import { isString, parseString } from '#src/utils/typeNarrowers';

interface Payload {
  username: string;
  id: string;
  isadmin: boolean;
}

const router = Router();

const secret: string | undefined = process.env.JSONWEBTOKENSECRET;

// Login user
router.post('/', async (req: Request, res: Response) => {
  // Handle missing JWT secret env variable
  if (!secret || !isString(secret)) {
    res.status(500).send('An error occurred. Please try again later.');
    throw new Error('JSONWEBTOKENSECRET is missing');
  }

  const username: string | null = req.body.username
    ? parseString(req.body.username)
    : null;

  const password: string | null = req.body.password
    ? parseString(req.body.password)
    : null;

  if (!username) {
    return res.status(400).send('Username missing');
  }

  if (!password) {
    return res.status(400).send('Password missing');
  }

  const user: UserModel | null = await UserModel.findOne({
    where: {
      username: username
    }
  });

  if (user) {
    // Convert database response data to JSON
    const userJSON: User = user.toJSON();

    // If passwordhash is null in database, send error. Else send access token
    if (userJSON.passwordhash !== null) {
      const passwordCorrect: boolean = await bcrypt.compare(
        password,
        userJSON.passwordhash
      );

      if (!passwordCorrect) {
        return res.status(400).send('Incorrect password');
      }

      const payload: Payload = {
        username: userJSON.username,
        id: userJSON.id,
        isadmin: userJSON.isadmin
      };

      // Send JWT that expires in 1 hour
      const token: string = jwt.sign(payload, secret, { expiresIn: '1h' });
      return res.status(200).send({ token, ...payload });
    } else {
      return res.status(500).send('User has no password set');
    }
  } else {
    return res.status(400).send('User not found');
  }
});

export default router;
