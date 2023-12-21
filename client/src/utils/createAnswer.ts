import { Answer } from "../types/Question";

export default function createAnswer(): Answer {
    return {
        label: "new answer",
        isCorrect: false,
    }
}