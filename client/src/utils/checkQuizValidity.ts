import { Quiz } from "../types/Quiz";

export default function checkQuizValidity(quiz: Quiz) {
    if (quiz.title === "") return { error: "Quiz title is invalid" }

    try {
        if (quiz.questions.length === 0) throw new Error(`Quiz needs at least 1 questions`);

        quiz.questions.map((ques, i) => {
            if (ques.text === "") throw new Error(`Question ${i + 1} is invalid`);

            if (ques.answers.length < 2) throw new Error(`Question ${i + 1} needs at least 2 answers`);

            let answersCount = 0
            ques.answers.map((ans, j) => {
                if (ans.label === "") throw new Error(`Answer ${j + 1} of the question ${i + 1} is invalid`)

                if (ans.isCorrect) answersCount++;
            })

            if (answersCount === 0) throw new Error(`Question ${i + 1} needs correct answer(s)`)

            if (ques.type === "single" && answersCount > 1) throw new Error(`Question ${i + 1} is single choice question, please select only one answer`)
        })

        return true
    } catch (error: any) {
        return { error: error.message as string }
    }

}