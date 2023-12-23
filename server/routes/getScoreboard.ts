import { Router } from 'express';
import { Request, Response } from 'express';
import { getPlayersOfQuiz } from '../utils/playerDataOperations';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {
    try {
        const quizId: string = req.body.quizId;

        const scoreboard = getPlayersOfQuiz(quizId).sort((a, b) => b.score - a.score);

        return res.status(200).json(scoreboard);
    } catch (error) {
        return res.status(400).json({ error: "Failed reading data" });
    }
});

export default router;