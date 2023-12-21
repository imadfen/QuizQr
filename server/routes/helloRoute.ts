import express, { Request, Response } from 'express';
const router = express.Router();

router.get('/hello', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

export default router;