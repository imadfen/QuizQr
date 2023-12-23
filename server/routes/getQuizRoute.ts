import { Router } from 'express';
import { Request, Response } from 'express';
import { readQuizzesData } from '../utils/QuizzesDataOperations';

const router = Router();

router.post("/", (req: Request, res: Response) => {
    try {
        const quizId: string = req.body.quizId;
        const quizzes = readQuizzesData();
        const quiz = quizzes.find(quiz => quiz.id === quizId && quiz.isPublished);
        return res.status(200).json(quiz ? quiz : null);
    } catch (error) {
        return res.status(400).json({ error: "Failed reading data" });
    }
});

export default router;