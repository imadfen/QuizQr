import { Question } from "../types/Question";
import createAnswer from "./createAnswer";

export default function createQuestion(): Question {
    return {
        text: "new question",
        type: "single",
        answers: [createAnswer(), createAnswer()]
    }
}