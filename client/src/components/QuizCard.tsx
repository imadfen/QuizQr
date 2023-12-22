import { Icon } from "@iconify/react/dist/iconify.js";
import { Quiz } from "../types/Quiz";
import { serverUrl } from "../utils/serverUrl";

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
    <div
      className="relative hover:scale-105 duration-150 shadow-2xl border-4 rounded-2xl"
      style={{
        background: quiz.theme.background,
        color: quiz.theme.text,
        borderColor: quiz.theme.text,
      }}
    >
      <Icon
        icon="material-symbols:delete"
        width={25}
        onClick={deleteQuiz}
        className="cursor-pointer absolute bottom-5 right-5 z-10"
        style={{ color: quiz.theme.text }}
      />
      <div
        onClick={selectQuiz}
        className="rounded-md p-4 w-80 mb-4 flex items-center gap-2"
      >
        <img
          src={`${serverUrl}/qrcode/${quiz.qrCodeName}`}
          alt=""
          className="w-1/3 aspect-square border-2 border-black"
        />
        <div>
          <h3 className="text-2xl font-extrabold">{quiz.title}</h3>
          <p className="text-xs mb-3">({quiz.id})</p>
          <p className="font-semibold mb-2">
            Questions: {quiz.questions.length}
          </p>
          <p className="font-semibold mb-2">
            Participants: {quiz.participantsCount}
          </p>
        </div>
      </div>
    </div>
  );
}
