import { Quiz } from "../types/Quiz";
import EditQuiz from "./EditQuiz";
import Themes from "../utils/themes";
import createQuestion from "../utils/createQuestion";
import { useState } from "react";
import QuizList from "../components/QuizList";
import createEmptyQuiz from "../utils/createEmptyQuiz";

export default function Creators() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  const testQuizzes: Quiz[] = [
    {
      id: "1",
      theme: Themes[0],
      title: "first quiz",
      questions: [createQuestion()],
      participantsCount: 100,
    },
    {
      id: "2",
      theme: Themes[0],
      title: "second quiz",
      questions: [createQuestion()],
      participantsCount: 150,
    },
    {
      id: "3",
      theme: Themes[0],
      title: "third quiz",
      questions: [createQuestion()],
      participantsCount: 90,
    },
  ];

  const goBack = () => {
    setSelectedQuiz(null);
  };

  const addQuiz = () => {
    const newQuiz = createEmptyQuiz();
    testQuizzes.push(newQuiz);
    setSelectedQuiz(newQuiz);
  };

  const handleSaveQuiz = (quiz: Quiz) => {
    console.log(quiz);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center py-5">
      {selectedQuiz ? (
        <EditQuiz
          selectedQuiz={selectedQuiz}
          goBack={goBack}
          onSaveQuizDone={handleSaveQuiz}
        />
      ) : (
        <QuizList
          quizzes={testQuizzes}
          selectQuiz={setSelectedQuiz}
          addQuiz={addQuiz}
        />
      )}
    </div>
  );
}
