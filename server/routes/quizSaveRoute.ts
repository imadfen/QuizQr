import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { addToQuizzesData } from '../utils/QuizzesDataOperations';
import { Quiz } from '../types/Quiz';

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {
    const newQuiz: Quiz = req.body;

    try {
        addToQuizzesData(newQuiz);
        return res.status(200).json({message: "Quiz saved"});
    } catch (error) {
        return res.status(400).json({ error: "Failed updating data" });
    }
});

export default router;