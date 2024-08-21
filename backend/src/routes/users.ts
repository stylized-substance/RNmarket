import { Request, Response, Router } from 'express';
import { User as UserModel } from '#src/models';
import { User, NewUser } from '#src/types/types';
import { parseNewUser, parseString } from '#src/utils/typeNarrowers';
import tokenExtractor from '#src/middleware/tokenExtractor';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router: Router = Router();

// Get users
router.get('/', async (_req: Request, res: Response) => {
  const users: UserModel[] | [] = await UserModel.findAll({
    attributes: {
      exclude: ['passwordhash']
    }
  });
  res.json(users);
});

// Add user
router.post('/', tokenExtractor, async (req: Request, res: Response) => {
  const newUser: NewUser = parseNewUser(req.body);

  // Allow only admin users to create admin users
  if (newUser.isadmin === true && req.isadmin === false) {
    return res.status(403).send('Only admin users can create admin users');
  }

  const saltRounds: number = 12;
  const passwordHash: string = await bcrypt.hash(newUser.password, saltRounds);

  const userToAdd: User = {
    ...newUser,
    id: uuidv4(),
    passwordhash: passwordHash
  };

  const addedUser: UserModel = await UserModel.create({ ...userToAdd });
  return res.json(addedUser);
});

// Change user password
router.put('/:id', tokenExtractor, async (req: Request, res: Response) => {
  const user: UserModel | null = await UserModel.findByPk(req.params.id);

  if (user) {
    const userJSON = user.toJSON(); // Convert user model to JSON to get the actual data

    // Prevent users changing each others passwords
    if (userJSON.id !== req.verifiedToken.id) {
      return res.status(403).send('Users can only change their own password');
    }
    console.log('json', userJSON);
    const saltRounds: number = 12;
    const newPasswordHash: string = await bcrypt.hash(
      req.body.password,
      saltRounds
    );
    const userWithNewPassword: User = {
      ...userJSON,
      passwordhash: newPasswordHash
    };
    await user.update(userWithNewPassword);
    const saveResult: UserModel = await user.save();
    return res.send(saveResult);
  } else {
    return res.status(404).send('User not found');
  }
});

// Delete user
router.delete('/:id', async (req: Request, res: Response) => {
  // Allow only admin users to delete users
  if (req.isadmin === false) {
    return res.status(403).send('Only admin users can delete users');
  }

  const id: string = parseString(req.params.id);
  const user: UserModel | null = await UserModel.findByPk(id);

  if (user) {
    await user.destroy();
    return res.status(204).end();
  } else {
    return res.status(404).send('User not found');
  }
});

export default router;
