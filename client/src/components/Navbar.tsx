import QuizQr_logo from "../assets/quizQrLogo.png";
import { Icon } from "@iconify/react";
import logoutUser from "../utils/logoutUser";
import { useNavigate } from "react-router-dom";

type PropsType = {
  isAdmin: boolean;
};

export default function Navbar({ isAdmin }: PropsType) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 py-4 w-full flex justify-between px-10">
      <div className="px-4 flex items-center gap-5">
        <img src={QuizQr_logo} alt="" width={60} />
        <div className="text-white text-3xl font-bold">
          {isAdmin ? "QuizQr - Dashboard" : "QuizQr"}
        </div>
      </div>
      {isAdmin && (
        <Icon
          icon="mingcute:exit-fill"
          width={60}
          className="text-white cursor-pointer"
          onClick={() => {
            logoutUser();
            navigate("login");
          }}
        />
      )}
    </nav>
  );
}
