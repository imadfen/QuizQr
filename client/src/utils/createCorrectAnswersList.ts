import { Question } from "../types/Question";

export default function createCorrectAnswersList(questions: Question[]) {
    const answersList: boolean[][] = [];
    questions.map((ques, i) => {
        answersList.push([]);
        ques.answers.map((ans) => {
            answersList[i].push(ans.isCorrect);
        });
    });

    return answersList;
}