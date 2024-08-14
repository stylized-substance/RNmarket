import { Request, Response, Router } from 'express';
import { User } from '#src/models';
import { isNewUser } from '#src/utils/typeNarrowers';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get users
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['passwordhash']
    }
  });
  res.json(users);
});

// Add user
router.post('/create', async (req: Request, res: Response) => {
  if (isNewUser(req.body)) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    const userToAdd = {
      ...req.body,
      id: uuidv4(),
      passwordhash: passwordHash
    };
    const addedUser = await User.create(userToAdd);
    res.json(addedUser);
  } else {
    res.status(400).send('Invalid properties for new user');
  }
});

export default router;
