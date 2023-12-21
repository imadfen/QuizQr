import { Quiz } from "../types/Quiz";
import createQuestion from "./createQuestion";
import generateRandomId from "./generateRandomId";
import Themes from "./themes";

export default function createEmptyQuiz(): Quiz {
    return {
        id: generateRandomId(),
        theme: Themes[0],
        title: "New Quiz",
        questions: [createQuestion()],
        participantsCount: 0,
    }
}