import { Quiz } from "../types/Quiz";

export default function compareQuizzes(quiz1: Quiz, quiz2: Quiz): boolean {
    if (quiz1.id !== quiz2.id) {
      return false;
    }
  
    if (
      quiz1.theme.id !== quiz2.theme.id ||
      quiz1.theme.name !== quiz2.theme.name ||
      quiz1.theme.text !== quiz2.theme.text ||
      quiz1.theme.background !== quiz2.theme.background
    ) {
      return false;
    }
  
    if (quiz1.title !== quiz2.title) {
      return false;
    }

    if (quiz1.participantsCount !== quiz2.participantsCount) {
      return false;
    }
  
    if (quiz1.questions.length !== quiz2.questions.length) {
      return false;
    }
  
    for (let i = 0; i < quiz1.questions.length; i++) {
      const q1 = quiz1.questions[i];
      const q2 = quiz2.questions[i];
  
      if (
        q1.text !== q2.text ||
        q1.type !== q2.type ||
        q1.answers.length !== q2.answers.length ||
        !q1.answers.every(
          (ans, index) =>
            ans.label === q2.answers[index].label &&
            ans.isCorrect === q2.answers[index].isCorrect
        )
      ) {
        return false;
      }
    }
  
    return true;
  }