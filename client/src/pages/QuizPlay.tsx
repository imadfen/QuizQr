import { useEffect, useState } from "react";
import StartPlayFrom from "../components/StartPlayFrom";
import { Quiz } from "../types/Quiz";
import { serverUrl } from "../utils/serverUrl";
import { Icon } from "@iconify/react/dist/iconify.js";
import Playground from "./Playground";
import { Player } from "../types/Player";
import CongratPlayer from "./CongratPlayer";
import { useParams } from "react-router-dom";

export default function QuizPlay() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [donePlayed, setDonePlayed] = useState(false);
  const [unavailableQuiz, setUnavailableQuiz] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [loadingSavePlayer, setLoadingSavePlayer] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  let params = useParams();

  useEffect(() => {
    setErrorLoad(false);
    setLoadingQuiz(true);

    fetch(`${serverUrl}/get-quiz`, {
      headers: { "content-type": "Application/json" },
      method: "POST",
      body: JSON.stringify({ quizId: params.quizId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorLoad(true);
        }
      })
      .then((data: Quiz | null) => {
        if (data === null) {
          return setUnavailableQuiz(true);
        }
        setQuiz(data);
        setPlayer({
          name: "",
          quizId: data.id,
          score: 0,
        });
      })
      .catch((_) => {
        setErrorLoad(true);
      });
    setLoadingQuiz(false);
  }, []);

  const onDonePlay = (score: number) => {
    setLoadingSavePlayer(true);
    setPlayer(
      (prev) =>
        prev && {
          ...prev,
          score,
        }
    );

    fetch(`${serverUrl}/save-player`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(player),
    }).then((response) => {
      if (response.ok) {
        setLoadingSavePlayer(false);
        setDonePlayed(true);
      } else {
        setLoadingSavePlayer(false);
      }
    });
  };

  const setPlayerName = (playerName: string) => {
    setPlayer(
      (prev) =>
        prev && {
          ...prev,
          name: playerName,
        }
    );
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {errorLoad ? (
        <p className="text-red-500 text-xl font-bold">Something went wrong!</p>
      ) : loadingQuiz ? (
        <Icon icon="line-md:loading-loop" width={60} />
      ) : unavailableQuiz ? (
        <div>Unavailable quiz</div>
      ) : (
        quiz &&
        player &&
        (donePlayed && player.name !== "" ? (
          <CongratPlayer
            playerName={player.name}
            score={player.score}
            theme={quiz.theme}
          />
        ) : player.name !== "" ? (
          <Playground
            quiz={quiz}
            player={player.name}
            onDone={onDonePlay}
            loadingSave={loadingSavePlayer}
          />
        ) : (
          <StartPlayFrom
            quizTitle={quiz.title}
            quizeTheme={quiz.theme}
            setPlayer={setPlayerName}
          />
        ))
      )}
    </div>
  );
}
