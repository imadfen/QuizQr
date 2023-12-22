import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$qLyqSHVS.Jum0QB4pNP/6etFHULbg5gzx8nlpO0irJ4/j5eNCFn56',
  },
];

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  try {
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const secretKey = process.env.SECRET_KEY || '';
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '4h' });
    return res.json({ token });
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' });
  }
});


router.get('/check-login', authMiddleware, (req: Request, res: Response) => {
  res.json({ message: 'Successfully logged in' });
});

export default router;
