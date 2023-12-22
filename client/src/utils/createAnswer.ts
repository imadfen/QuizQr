import { Answer } from "../types/Question";

export default function createAnswer(isCorrect: boolean = false): Answer {
    return {
        label: "new answer",
        isCorrect,
    }
}