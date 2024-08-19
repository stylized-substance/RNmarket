import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { User } from '#src/types/types';
import { isNewUser } from '#src/utils/typeNarrowers';
import tokenExtractor from '#src/middleware/tokenExtractor';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get users
router.get('/', async (_req: Request, res: Response) => {
  const users = await UserModel.findAll({
    attributes: {
      exclude: ['passwordhash']
    }
  });
  res.json(users);
});

// Add user
// TODO: prevent non-admin users from creating admin users
router.post('/', async (req: Request, res: Response) => {
  if (isNewUser(req.body)) {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    const userToAdd: User = {
      ...req.body,
      id: uuidv4(),
      passwordhash: passwordHash
    };

    const addedUser = await UserModel.create({ ...userToAdd });
    res.json(addedUser);
  } else {
    res.status(400).send('Invalid properties for new user');
  }
});

// Change user password
router.put('/:id', tokenExtractor, async (req: Request, res: Response) => {
  const user = await UserModel.findByPk(req.params.id);
  const saltRounds = 12;
  const newPasswordHash = await bcrypt.hash(req.body.password, saltRounds);

  if (user) {
    const userWithNewPassword = {
      ...user,
      passwordhash: newPasswordHash
    };
    await user.update(userWithNewPassword);
    const saveResult = await user.save();
    res.send(saveResult);
  } else {
    res.status(404).send('User not found');
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  const user = await UserModel.findByPk(req.params.id);

  if (user) {
    await user.destroy();
    res.status(204).end();
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
