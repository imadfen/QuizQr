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
    <>
      {isAdmin ? (
        <nav className="bg-gray-100 drop-shadow-xl py-4 px-2 sm:px-5 md:px-10 w-full flex justify-between items-center">
          <div
            className="px-4 flex items-center gap-5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={QuizQr_logo} alt="" width={60} />
            <div className="text-xl sm:text-2xl md:text-3xl font-black">
              QuizQr Dashboard
            </div>
          </div>
          <Icon
            icon="mingcute:exit-fill"
            width={30}
            className="cursor-pointer"
            onClick={() => {
              logoutUser();
              navigate("login");
            }}
          />
        </nav>
      ) : (
        <nav className="bg-gray-100 drop-shadow-xl py-4 px-2 sm:px-5 md:px-10 w-full flex justify-between items-center">
          <div className="px-4 flex items-center gap-5">
            <img src={QuizQr_logo} alt="" width={60} />
            <div className="text-xl sm:text-2xl md:text-3xl font-black">
              QuizQr
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
