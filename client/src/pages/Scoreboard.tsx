import { useEffect, useState } from "react";
import { Quiz } from "../types/Quiz";
import { Player } from "../types/Player";
import { serverUrl } from "../utils/serverUrl";
import { Icon } from "@iconify/react/dist/iconify.js";

type PropsType = {
  quiz: Quiz;
  goBack: () => void;
};

export default function Scoreboard({ quiz, goBack }: PropsType) {
  const [playersList, setPlayersList] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${serverUrl}/get-scoreboard`, {
      headers: {
        "content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify({ quizId: quiz.id }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setError(true);
        }
      })
      .then((data: any) => {
        setPlayersList(data);
      })
      .catch((_) => {
        setError(true);
      });
    setLoading(false);
  }, []);

  return (
    <>
      {error ? (
        <p className="text-red-500 text-xl font-bold">Something went wrong!</p>
      ) : loading ? (
        <Icon icon="line-md:loading-loop" width={60} />
      ) : (
        <div className="w-full min-h-full sm:w-3/4 md:w-2/3 bg-gray-100 py-4 px-6 rounded-xl drop-shadow-2xl">
          <div
            onClick={goBack}
            className="flex items-center gap-3 my-5 cursor-pointer w-fit"
          >
            <Icon icon="bxs:left-arrow" width={30} />
            <p className="text-xl font-bold">Back</p>
          </div>
          <h2 className="text-5xl font-bold mb-4">Scoreboard - {quiz.title}</h2>
          <div className="flex flex-col items-center sm:px-32">
            {playersList.length === 0 ? (
              <span>No players yet</span>
            ) : (
              playersList.map((player, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center w-full rounded-md px-3 py-2 mb-2"
                  style={{
                    background: quiz.theme.background,
                    color: quiz.theme.text,
                  }}
                >
                  <div className="flex-grow">
                    <span className="text-lg font-semibold">{player.name}</span>
                  </div>
                  <div className="text-lg font-semibold">{player.score}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
