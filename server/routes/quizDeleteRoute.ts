import { Router } from 'express';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { deleteFromQuizzesData } from '../utils/QuizzesDataOperations';

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {
    const { quizId } = req.body;

    try {
        deleteFromQuizzesData(quizId);
        return res.status(200).json({message: "Quiz deleted"});
    } catch (error) {
        return res.status(400).json({ error: "Failed updating data" });
    }
});

export default router;