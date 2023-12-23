import { useNavigate } from "react-router-dom";
import { Theme } from "../types/Quiz";

type PropsType = {
  playerName: string;
  score: number;
  theme: Theme;
};

export default function CongratPlayer({ playerName, score, theme }: PropsType) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center cursor-default"
      style={{ background: theme.background, color: theme.text }}
    >
      <h1 className="text-3xl sm:text-5xl font-extrabold">
        Congratulations {playerName} !
      </h1>
      <h3 className="text-2xl sm:text-4xl font-bold">
        You got {score} choices right
      </h3>
      <div className="mt-5 flex flex-col gap-3">
        <button className="" style={{background: theme.text, color: theme.background}} onClick={() => navigate(0)}>Play again</button>
        <button className="border-4 bg-white" style={{borderColor: theme.text, color: theme.text}} onClick={() => navigate("/")}>Exit</button>
      </div>
    </div>
  );
}
