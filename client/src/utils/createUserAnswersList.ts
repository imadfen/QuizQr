import { Question } from "../types/Question";

export default function createUserAnswersList(questions: Question[]) {
    const answersList: boolean[][] = [];
    questions.map((ques, i) => {
        answersList.push([]);
        answersList[i] = ques.answers.map(_ => false);
    })

    return answersList;
}