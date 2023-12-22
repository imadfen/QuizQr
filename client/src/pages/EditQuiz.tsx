import { useState } from "react";
import { Quiz } from "../types/Quiz";
import createQuestion from "../utils/createQuestion";
import Themes from "../utils/themes";
import createAnswer from "../utils/createAnswer";
import checkQuizValidity from "../utils/checkQuizValidity";
import { Icon } from "@iconify/react/dist/iconify.js";
import { serverUrl } from "../utils/serverUrl";
import compareQuizzes from "../utils/compareQuizzes";
import changeOrderAtIndex from "../utils/changeOrderAtIndex";
import { Answer, Question } from "../types/Question";

type PropsType = {
  selectedQuiz: Quiz;
  goBack: () => void;
  onSaveQuizDone: () => void;
};

export default function EditQuiz({
  selectedQuiz,
  goBack,
  onSaveQuizDone,
}: PropsType) {
  const [quiz, setQuiz] = useState<Quiz>(selectedQuiz);
  const [saveError, setSaveError] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  //================ UPDATE QUIZ TITLE =================
  const handleQuizTitleChange = (value: string) => {
    setQuiz((prev) => ({
      ...prev,
      title: value,
    }));
  };

  //================ UPDATE QUIZ TITLE =================
  const handleUpdateQuizPublishSwitch = () => {
    setQuiz((prev) => ({
      ...prev,
      isPublished: !prev.isPublished,
    }));
  };

  //================ UPDATE QUESTION TEXT =================
  const handleQuestionTextChange = (index: number, value: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        index === i
          ? {
              ...ques,
              text: value,
            }
          : ques
      ),
    }));
  };

  //================ UPDATE QUESTION TYPE =================
  const indexOfFirstCorrectAns = (ques: Question) => {
    return ques.answers.findIndex((ans) => ans.isCorrect);
  };
  const handleQuestionTypeChange = (
    index: number,
    value: "single" | "multiple"
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        index === i
          ? value === "single"
            ? {
                ...ques,
                type: value,
                answers:
                  indexOfFirstCorrectAns(ques) === -1
                    ? ques.answers.map((ans, j) =>
                        j === 0
                          ? {
                              ...ans,
                              isCorrect: true,
                            }
                          : ans
                      )
                    : ques.answers.map((ans, j) =>
                        indexOfFirstCorrectAns(ques) === j
                          ? {
                              ...ans,
                              isCorrect: true,
                            }
                          : {
                              ...ans,
                              isCorrect: false,
                            }
                      ),
              }
            : {
                ...ques,
                type: value,
              }
          : ques
      ),
    }));
  };

  //================ ADD QUESTION =================
  const handleAddQuestion = () => {
    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, createQuestion()],
    }));
  };

  //================ DELETE QUESTION =================
  const handleDeleteQuestion = (qIndex: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIndex),
    }));
  };

  //================ UPDATE ANSWER =================
  const handleAnswerChange = (
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        qIndex === i
          ? {
              ...ques,
              answers: ques.answers.map((ans, j) =>
                aIndex == j
                  ? {
                      ...ans,
                      label: value,
                    }
                  : ans
              ),
            }
          : ques
      ),
    }));
  };

  //================ UPDATE ANSWER ORDER =================
  const handleUpdateAnswerOrder = (
    qIndex: number,
    aIndex: number,
    direction: "up" | "down"
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        qIndex === i
          ? {
              ...ques,
              answers: changeOrderAtIndex<Answer>(
                ques.answers,
                aIndex,
                direction
              ),
            }
          : ques
      ),
    }));
  };

  //================ UPDATE THEME =================
  const handleThemeChange = (themeId: string) => {
    setQuiz((prev) => ({
      ...prev,
      theme: Themes.find((theme) => theme.id === themeId) || Themes[0],
    }));
  };

  //================ UPDATE CORRECT ANSWER =================
  const handleCorrectAnswerChange = (
    qIndex: number,
    aIndex: number,
    value: boolean
  ) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        qIndex === i
          ? {
              ...ques,
              answers: ques.answers.map((ans, j) => {
                if (ques.type === "multiple") {
                  return aIndex == j
                    ? {
                        ...ans,
                        isCorrect: value,
                      }
                    : ans;
                } else {
                  return aIndex == j
                    ? {
                        ...ans,
                        isCorrect: true,
                      }
                    : {
                        ...ans,
                        isCorrect: false,
                      };
                }
              }),
            }
          : ques
      ),
    }));
  };

  //================ ADD ANSWER =================
  const handleAddAnswer = (qIndex: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        qIndex === i
          ? {
              ...ques,
              answers: [...ques.answers, createAnswer()],
            }
          : ques
      ),
    }));
  };

  //================ DELETE ANSWER =================
  const handleDeleteAnswer = (qIndex: number, aIndex: number) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((ques, i) =>
        qIndex === i
          ? {
              ...ques,
              answers: ques.answers.filter((_, j) => aIndex !== j),
            }
          : ques
      ),
    }));
  };

  //================ SUBMIT =================
  const handleSubmit = async () => {
    setSaveLoading(true);

    setSaveError("");
    const validityCheck = checkQuizValidity(quiz);

    if (validityCheck !== true) {
      return setSaveError(validityCheck.error);
    }

    const response = await fetch(`${serverUrl}/save-quiz`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      method: "POST",
      body: JSON.stringify(quiz),
    });

    setSaveLoading(false);

    if (response.ok) {
      onSaveQuizDone();
    } else {
      return setSaveError("Something went wrong, try again later.");
    }
  };

  return (
    <div className="px-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <div
            onClick={goBack}
            className="flex items-center gap-3 my-5 cursor-pointer w-fit"
          >
            <Icon icon="bxs:left-arrow" width={30} />
            <p className="text-xl font-bold">Back</p>
          </div>
          {!compareQuizzes(quiz, selectedQuiz) && (
            <p className="text-lg text-red-500 font-semibold">(Not saved)</p>
          )}
        </div>
        <div className="flex items-center gap-5">
          <span className="text-red-500 font-bold text-xl">{saveError}</span>
          {quiz.isPublished ? (
            <button
              className="bg-green-500 font-bold text-white rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer"
              onClick={handleUpdateQuizPublishSwitch}
            >
              Published
            </button>
          ) : (
            <button
              className="bg-white border-4 border-red-500 font-bold text-red-500 rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer"
              onClick={handleUpdateQuizPublishSwitch}
            >
              Not published
            </button>
          )}
          <button
            disabled={saveLoading}
            onClick={handleSubmit}
            className="bg-indigo-500 font-bold text-white rounded-md px-4 py-2 flex items-center gap-3 cursor-pointer"
          >
            <Icon icon="material-symbols:save" width={30} />
            <p>Save Quiz</p>
          </button>
        </div>
      </div>

      {/* ===================== quiz title ======================= */}
      <div
        style={{ background: quiz.theme.background, color: quiz.theme.text }}
        className="h-32 flex justify-center"
      >
        <input
          type="text"
          value={quiz.title}
          onChange={(e) => handleQuizTitleChange(e.target.value)}
          className="w-full text-4xl text-center font-extrabold bg-transparent rounded-md p-2 mb-2 focus:outline-none"
          style={{ color: quiz.theme.text }}
        />
      </div>
      <div className="my-4">
        <div className="flex items-baseline gap-3">
          <p className="block mb-2 text-xl font-medium">Choose Theme:</p>
          <p>{quiz.theme.name}</p>
        </div>

        {/* ======================= themes ======================== */}
        <div className="flex gap-3">
          {Themes.map((theme, i) => (
            <div
              key={i}
              className="w-16 aspect-square flex hover:scale-105 duration-150"
              onClick={() => handleThemeChange(theme.id)}
            >
              <div
                style={{ background: theme.text, width: "33%", height: "100%" }}
              ></div>
              <div
                style={{
                  background: theme.background,
                  width: "67%",
                  height: "100%",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= questions ================== */}
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-5 rounded-xl border-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`question${qIndex + 1}`}
              className="block mb-2 font-medium text-xl"
            >
              Question {qIndex + 1}:
            </label>
            <Icon
              icon="material-symbols:delete"
              className="cursor-pointer"
              width={30}
              onClick={() => handleDeleteQuestion(qIndex)}
            />
          </div>
          <input
            type="text"
            id={`question${qIndex + 1}`}
            value={question.text}
            onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
            className="border-4 border-gray-300 rounded-md p-2 mb-2 w-full"
          />

          {/* ===================== answers ======================= */}
          <div>
            {question.answers.map((answer, aIndex) => (
              <div key={aIndex} className="flex items-center my-2 gap-4">
                <div className="flex">
                  <Icon
                    icon="mingcute:up-fill"
                    width={20}
                    className="border cursor-pointer"
                    onClick={() =>
                      handleUpdateAnswerOrder(qIndex, aIndex, "up")
                    }
                  />
                  <Icon
                    icon="mingcute:down-fill"
                    width={20}
                    className="border cursor-pointer"
                    onClick={() =>
                      handleUpdateAnswerOrder(qIndex, aIndex, "down")
                    }
                  />
                </div>
                <input
                  type={question.type === "single" ? "radio" : "checkbox"}
                  value={answer.label}
                  checked={answer.isCorrect}
                  onChange={(e) =>
                    handleCorrectAnswerChange(qIndex, aIndex, e.target.checked)
                  }
                  className="border-4 border-gray-400 rounded-md p-2 mr-2"
                />
                <input
                  type="text"
                  value={answer.label}
                  placeholder="Answer label"
                  className="p-2 border-2 rounded-md"
                  style={
                    answer.isCorrect
                      ? { background: "green", color: "white" }
                      : { borderColor: "red" }
                  }
                  onChange={(e) =>
                    handleAnswerChange(qIndex, aIndex, e.target.value)
                  }
                />
                <Icon
                  icon="material-symbols:delete"
                  width={20}
                  className="cursor-pointer"
                  onClick={() => handleDeleteAnswer(qIndex, aIndex)}
                />
              </div>
            ))}
            <button onClick={() => handleAddAnswer(qIndex)}>Add Answer</button>
          </div>
          <div className="mt-2">
            <label className="mr-4">
              Single Choice
              <input
                type="radio"
                value="single"
                checked={question.type === "single"}
                onChange={() => handleQuestionTypeChange(qIndex, "single")}
                className="ml-2"
              />
            </label>
            <label>
              Multiple Choice
              <input
                type="radio"
                value="multiple"
                checked={question.type === "multiple"}
                onChange={() => handleQuestionTypeChange(qIndex, "multiple")}
                className="ml-2"
              />
            </label>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={handleAddQuestion}
          className="bg-green-500 text-white rounded-md px-4 py-2 mb-4 mx-auto flex items-center gap-3"
        >
          <Icon icon="mingcute:plus-fill" width={30} />
          <p>Add Question</p>
        </button>
      </div>
    </div>
  );
}
