import fs from "fs";
import path from "path";
import qr from "qr-image";

const clientUrl = process.env.CLIENT_URL

export default function createQrCode(quizId: string, fileName: string) {
    if (clientUrl) {
        const quizUrl = `${clientUrl}/quiz/${quizId}`
        const qrImage = qr.image(quizUrl, { type: 'png' });
        const filePath = path.join(__dirname, "..", "data", "qr_codes", fileName);
    
        qrImage.pipe(fs.createWriteStream(filePath));
    }
}