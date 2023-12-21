import { Quiz } from "../types/Quiz";

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: QuizCardProps) {
  return (
    <div
      className="shadow-md rounded-md p-4 w-80 mb-4 hover:scale-105 duration-150"
      style={{ background: quiz.theme.background, color: quiz.theme.text }}
    >
      <h3 className="text-lg font-semibold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-2">Questions: {quiz.questions.length}</p>
      <p className="text-gray-600 mb-2">
        Participants: {quiz.participantsCount}
      </p>
      <img src="https://via.placeholder.com/300x300" alt="" />
    </div>
  );
}
