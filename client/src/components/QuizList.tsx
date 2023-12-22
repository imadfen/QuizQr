import { Icon } from "@iconify/react/dist/iconify.js";
import { Quiz } from "../types/Quiz";
import QuizCard from "./QuizCard";
import { serverUrl } from "../utils/serverUrl";

type PropsType = {
  quizzes: Quiz[];
  selectQuiz: (quiz: Quiz) => void;
  addQuiz: () => void;
  onDeleteQuizDone: () => void;
};

export default function QuizList({
  quizzes,
  selectQuiz,
  addQuiz,
  onDeleteQuizDone,
}: PropsType) {
  const deleteQuiz = async (quizId: string) => {
    await fetch(`${serverUrl}/delete-quiz`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ quizId }),
    });

    onDeleteQuizDone();
  };

  if (quizzes.length === 0)
    return (
      <div className="flex justify-center items-center w-full">
        <p className="text-xl font-bold text-gray-500">
          No quizzes yet, create one !
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {quizzes.map((quiz, i) => (
        <div key={i}>
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            selectQuiz={() => selectQuiz(quiz)}
            deleteQuiz={() => deleteQuiz(quiz.id)}
          />
        </div>
      ))}
      <div
        className="bg-blue-500 p-3 rounded-3xl w-fit aspect-square fixed bottom-10 right-10 cursor-pointer hover:scale-105 duration-150"
        onClick={addQuiz}
      >
        <Icon icon="mingcute:plus-fill" width={60} />
      </div>
    </div>
  );
}
