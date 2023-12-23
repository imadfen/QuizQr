import { Question } from "../types/Question";

export default function createUserConfirmedAnswers(questions: Question[]) {
    const list: (boolean|null)[][] = [];
    questions.map((ques) => list.push(ques.answers.map(() => false)));
    return list;
}