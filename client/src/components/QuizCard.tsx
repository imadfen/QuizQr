import { Icon } from "@iconify/react/dist/iconify.js";
import { Quiz } from "../types/Quiz";
import { serverUrl } from "../utils/serverUrl";

interface QuizCardProps {
  quiz: Quiz;
  selectQuiz: () => void;
  openScoreboard: () => void;
  deleteQuiz: () => void;
}

export default function QuizCard({
  quiz,
  selectQuiz,
  openScoreboard,
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
      <div className="absolute bottom-5 right-5 z-10">
        <Icon
          icon="mingcute:table-line"
          width={25}
          onClick={openScoreboard}
          className="cursor-pointer mb-3"
          style={{ color: quiz.theme.text }}
        />
        <Icon
          icon="material-symbols:delete"
          width={25}
          onClick={deleteQuiz}
          className="cursor-pointer"
          style={{ color: quiz.theme.text }}
        />
      </div>
      <div
        className="w-4 aspect-square rounded-full absolute top-5 right-5"
        style={{ background: quiz.isPublished ? "#6ef246" : "#f54c4c" }}
      ></div>
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
          <h3 className="text-2xl font-extrabold mb-3">{quiz.title}</h3>
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
