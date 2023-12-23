import { Router } from 'express';
import { Request, Response } from 'express';
import { readQuizzesData } from '../utils/QuizzesDataOperations';

const router = Router();

router.get("/", (req: Request, res: Response) => {
    try {
        const quizList = readQuizzesData().filter(quiz => quiz.isPublished);
        if (quizList.length === 0)
            return res.status(200).json({ qrcode: null });

        const random = Math.floor(Math.random() * (quizList.length - 0)) + 0
        const quiz = quizList[random];
        return res.status(200).json({ qrcode: quiz.qrCodeName });
    } catch (error) {
        return res.status(400).json({ error: "Failed reading data" });
    }
});

export default router;