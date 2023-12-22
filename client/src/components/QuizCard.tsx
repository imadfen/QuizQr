import { Icon } from "@iconify/react/dist/iconify.js";
import { Quiz } from "../types/Quiz";

interface QuizCardProps {
  quiz: Quiz;
  selectQuiz: () => void;
  deleteQuiz: () => void;
}

export default function QuizCard({
  quiz,
  selectQuiz,
  deleteQuiz,
}: QuizCardProps) {
  return (
    <div className="relative hover:scale-105 duration-150">
      <Icon
        icon="material-symbols:delete"
        width={25}
        onClick={deleteQuiz}
        className="cursor-pointer absolute top-5 right-5 z-10"
        style={{ color: quiz.theme.text }}
      />
      <div
        onClick={selectQuiz}
        className="shadow-md rounded-md p-4 w-80 mb-4"
        style={{ background: quiz.theme.background, color: quiz.theme.text }}
      >
        <h3 className="text-2xl font-extrabold mb-2">{quiz.title}</h3>
        <p className="font-semibold mb-2">Questions: {quiz.questions.length}</p>
        <p className="font-semibold mb-2">
          Participants: {quiz.participantsCount}
        </p>
        <img src="https://via.placeholder.com/300x300" alt="" />
      </div>
    </div>
  );
}
