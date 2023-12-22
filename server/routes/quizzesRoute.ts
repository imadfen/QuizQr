import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { readQuizzesData } from '../utils/QuizzesDataOperations';

const router = Router();

router.get("/", authMiddleware, (req: Request, res: Response) => {
    try {
        const quizzes = readQuizzesData();
        return res.status(200).json(quizzes);
    } catch (error) {
        return res.status(400).json({error: "Failed reading data"});
    }
});

export default router;