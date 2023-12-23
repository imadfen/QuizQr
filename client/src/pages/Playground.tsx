import { useEffect, useState } from "react";
import { Quiz } from "../types/Quiz";
import createCorrectAnswersList from "../utils/createCorrectAnswersList";
import createUserAnswersList from "../utils/createUserAnswersList";
import confirmUserAnswers from "../utils/confirmUserAnswers";
import createUserConfirmedAnswers from "../utils/createUserConfirmedAnswers";
import { Icon } from "@iconify/react/dist/iconify.js";

type PropsType = {
  player: string;
  quiz: Quiz;
  onDone: (score: number) => void;
  loadingSave: boolean;
};

const ABCs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Playground({
  player,
  quiz,
  onDone,
  loadingSave,
}: PropsType) {
  const [score, setScore] = useState(0);
  const correctAnswersList = useState(
    createCorrectAnswersList(quiz.questions)
  )[0];
  const [userAnswer, setUserAnswer] = useState(
    createUserAnswersList(quiz.questions)
  );
  const [submitedAnswers, setSubmitedAnswers] = useState<number[]>([]);
  const [confirmedUserAnswers, setConfirmedUserAnswers] = useState<
    (boolean | null)[][]
  >(createUserConfirmedAnswers(quiz.questions));

  useEffect(() => {
    if (submitedAnswers.length === quiz.questions.length) {
      onDone(score);
    }
  }, [submitedAnswers]);

  const handleSwitchResponse = (
    qIndex: number,
    aIndex: number,
    type: "single" | "multiple"
  ) => {
    setUserAnswer((prev) =>
      type === "multiple"
        ? prev.map((ques, i) =>
            qIndex === i
              ? ques.map((ans, j) => (aIndex === j ? !ans : ans))
              : ques
          )
        : prev.map((ques, i) =>
            qIndex === i ? ques.map((_, j) => aIndex === j) : ques
          )
    );
  };

  const handleConfirmUserAnswers = (qIndex: number) => {
    const result = confirmUserAnswers(
      userAnswer[qIndex],
      correctAnswersList[qIndex]
    );

    setConfirmedUserAnswers((prev) =>
      prev.map((ans, i) => (qIndex === i ? result.resultList : ans))
    );
    setScore((prev) => (prev + result.score < 0 ? 0 : prev + result.score));
    setSubmitedAnswers((prev) => [...prev, qIndex]);
  };

  return (
    <div
      className="flex flex-col w-full h-screen relative cursor-default"
      style={{ color: quiz.theme.text }}
    >
      <div
        style={{ background: quiz.theme.background, opacity: "50%" }}
        className="-z-10 w-screen h-screen fixed top-0 left-0"
      />
      <div
        className="w-30 p-3 sm:px-10 flex items-center shadow-2xl z-40"
        style={{ background: quiz.theme.background }}
      >
        <h1 className="text-2xl sm:text-5xl font-extrabold flex-grow">
          {quiz.title}
        </h1>
        <p className="text-lg sm:text-3xl font-bold mr-5">{player}</p>
        <p className="text-md sm:text-2xl font-bold">score: {score}</p>
      </div>

      <div className="m-3 md:my-10 md:mx-10">
        {quiz.questions.map((ques, qIndex) => (
          <div
            key={`${quiz.id}_q${qIndex}`}
            className="border-4 rounded-2xl p-3 mb-3"
            style={{ borderColor: quiz.theme.text }}
          >
            <h3 className="text-xl font-bold">
              Q{qIndex + 1}:&nbsp;
              {ques.text}
            </h3>
            <div className="my-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {submitedAnswers.includes(qIndex)
                ? ques.answers.map((ans, aIndex) => (
                    <div
                      key={`${quiz.id}_a${aIndex}`}
                      className="bg-white border-2 flex items-center font-bold p-2 rounded-lg select-none"
                      style={{
                        borderColor: correctAnswersList[qIndex][aIndex]
                          ? "green"
                          : "red",
                      }}
                    >
                      <p className="flex-grow">
                        {ABCs[aIndex]}-&nbsp;
                        {ans.label}
                      </p>
                      {confirmedUserAnswers[qIndex][aIndex] !== null && (
                        <>
                          {confirmedUserAnswers[qIndex][aIndex] ? (
                            <Icon
                              icon="icon-park-solid:correct"
                              width={20}
                              className="text-green-400"
                            />
                          ) : (
                            <Icon
                              icon="octicon:x-12"
                              width={20}
                              className="text-red-400"
                            />
                          )}
                        </>
                      )}
                    </div>
                  ))
                : ques.answers.map((ans, aIndex) => (
                    <div
                      key={`${quiz.id}_a${aIndex}`}
                      className="bg-white font-bold p-2 rounded-lg hover:scale-[102%] duration-200 active:scale-100 cursor-pointer select-none"
                      onClick={() =>
                        handleSwitchResponse(qIndex, aIndex, ques.type)
                      }
                      style={{
                        background: userAnswer[qIndex][aIndex]
                          ? "#ffff89"
                          : "white",
                      }}
                    >
                      {ABCs[aIndex]}-&nbsp;
                      {ans.label}
                    </div>
                  ))}
            </div>

            {!submitedAnswers.includes(qIndex) && (
              <div
                className="flex items-center justify-end gap-3"
                onClick={() => handleConfirmUserAnswers(qIndex)}
              >
                <p className="font-bold">
                  {ques.type === "single"
                    ? "(single choice)"
                    : "(multiple choices)"}
                </p>
                <button className="p-2 bg-green-600">confirm</button>
              </div>
            )}
          </div>
        ))}
        <button
          className="my-4 w-full"
          disabled={loadingSave}
          onClick={() => onDone(score)}
          style={{ background: quiz.theme.background, color: quiz.theme.text }}
        >
          DONE
        </button>
      </div>
    </div>
  );
}
