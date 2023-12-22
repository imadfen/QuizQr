import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    if (imageName) {
        const filepath = path.join(__dirname, "..", "data", "qr_codes", imageName);
        return res.sendFile(filepath);
    }
});

export default router;