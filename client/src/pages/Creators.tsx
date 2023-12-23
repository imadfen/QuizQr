import { Quiz } from "../types/Quiz";
import EditQuiz from "./EditQuiz";
import { useEffect, useState } from "react";
import QuizList from "../components/QuizList";
import createEmptyQuiz from "../utils/createEmptyQuiz";
import { Icon } from "@iconify/react/dist/iconify.js";
import { serverUrl } from "../utils/serverUrl";
import Scoreboard from "./ScoreBoard";

export default function Creators() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizScoreboard, setQuizScoreboard] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    fetchQuizzesData();
  }, []);

  const fetchQuizzesData = async () => {
    setLoading(true);
    setErrorLoading(false);

    fetch(`${serverUrl}/quizzes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          setErrorLoading(true);
        }
      })
      .then((data) => {
        setQuizzes(data);
      })
      .catch((_) => {
        setErrorLoading(true);
      });

    setLoading(false);
  };

  const goBack = () => {
    setSelectedQuiz(null);
    setQuizScoreboard(null);
  };

  const addQuiz = () => {
    const newQuiz = createEmptyQuiz();
    setSelectedQuiz(newQuiz);
  };

  const handleDeleteQuiz = () => {
    fetchQuizzesData();
    goBack();
  };

  const handleSaveQuiz = () => {
    fetchQuizzesData();
    goBack();
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center items-center py-5">
      {errorLoading ? (
        <p className="text-red-500 text-xl font-bold">Something went wrong!</p>
      ) : loading ? (
        <Icon icon="line-md:loading-loop" width={60} />
      ) : quizScoreboard ? (
        <Scoreboard quiz={quizScoreboard} goBack={goBack} />
      ) : selectedQuiz ? (
        <EditQuiz
          selectedQuiz={selectedQuiz}
          goBack={goBack}
          onSaveQuizDone={handleSaveQuiz}
        />
      ) : (
        <QuizList
          quizzes={quizzes}
          selectQuiz={setSelectedQuiz}
          addQuiz={addQuiz}
          openScoreboard={setQuizScoreboard}
          onDeleteQuizDone={handleDeleteQuiz}
        />
      )}
    </div>
  );
}
