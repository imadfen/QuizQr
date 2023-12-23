import { Quiz } from "../types/Quiz";
import createQuestion from "./createQuestion";
import generateRandomId from "./generateRandomId";
import Themes from "./themes";

export default function createEmptyQuiz(): Quiz {
    const generatedId = generateRandomId(30);
    
    return {
        id: generatedId,
        theme: Themes[0],
        title: "New Quiz",
        qrCodeName: `qrcode_${generatedId}.png`,
        isPublished: false,
        questions: [createQuestion()],
        participantsCount: 0,
    }
}