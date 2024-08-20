import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { User } from '#src/types/types';
import { isString } from '#src/utils/typeNarrowers';

const router = Router();

const secret = process.env.JSONWEBTOKENSECRET;

// Login user
router.post('/', async (req: Request, res: Response) => {
  // Handle missing JWT secret env variable
  if (!secret || !isString(secret)) {
    res.status(500).send('An error occurred. Please try again later.');
    throw new Error('JSONWEBTOKENSECRET is missing');
  }

  const { username, password } = req.body;

  if (!username) {
    res.status(400).send('Username missing');
  }

  if (!password) {
    res.status(400).send('Password missing');
  }

  const user = await UserModel.findOne({
    where: {
      username: req.body.username
    }
  });

  if (user) {
    // Convert database response data to JSON
    const userJSON: User = user.toJSON();

    // If passwordhash is null in database, send error. Else send access token
    if (userJSON.passwordhash !== null) {
      const passwordCorrect = await bcrypt.compare(
        password,
        userJSON.passwordhash
      );

      if (!passwordCorrect) {
        res.status(400).send('Incorrect password');
      }

      const payload = {
        username: userJSON.username,
        id: userJSON.id,
        isadmin: userJSON.isadmin
      };

      // Send JWT that expires in 1 hour
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      res.status(200).send({ token, ...payload });
    } else {
      res.status(500).send('User has no password set');
    }
  } else {
    res.status(400).send('User not found');
  }
});

export default router;
