import { Router } from 'express';
import { Request, Response } from 'express';
import { Player } from '../types/Player';
import savePlayer from '../utils/savePlayer';

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const player: Player = req.body;

    try {
        savePlayer(player);
        return res.status(200).json({ message: "player saved" });
    } catch (error) {
        console.log(error);

        return res.status(400).json({ error: "Failed updating data" });
    }
});

export default router;