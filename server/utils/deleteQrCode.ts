import fs from "fs";
import path from "path";

const clientUrl = process.env.CLIENT_URL

export default function deleteQrCode(QrCodeFileName: string) {
    if (clientUrl) {
        const filePath = path.join(__dirname, "..", "data", "qr_codes", QrCodeFileName);

        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });
    }
}