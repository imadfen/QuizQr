import { Icon } from "@iconify/react/dist/iconify.js";
import { Quiz } from "../types/Quiz";
import QuizCard from "./QuizCard";

type PropsType = {
  quizzes: Quiz[];
  selectQuiz: (quiz: Quiz) => void;
  addQuiz: () => void;
};

export default function QuizList({ quizzes, selectQuiz, addQuiz }: PropsType) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <div onClick={() => selectQuiz(quiz)}>
          <QuizCard key={quiz.id} quiz={quiz} />
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
