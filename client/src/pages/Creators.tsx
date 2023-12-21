import { useState } from "react";

export default function Creators() {
  const [questions, setQuestions] = useState<string[]>([""]);
  const [options, setOptions] = useState<string[][]>([[""]]);

  const handleQuestionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedOptions = [...options];
    updatedOptions[qIndex][oIndex] = event.target.value;
    setOptions(updatedOptions);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setOptions([...options, [""]]);
  };

  const submitQuiz = () => {
    // Handle submitting the quiz data
    console.log("Questions:", questions);
    console.log("Options:", options);
    // You can send this data to an API, save it in state, or perform any necessary actions
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4">
          <label
            htmlFor={`question${qIndex + 1}`}
            className="block mb-2 font-medium"
          >
            Question {qIndex + 1}:
          </label>
          <input
            type="text"
            id={`question${qIndex + 1}`}
            value={question}
            onChange={(e) => handleQuestionChange(qIndex, e)}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
          />
          <div>
            {options[qIndex].map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                className="border border-gray-300 rounded-md p-2 mb-2 mr-2"
              />
            ))}
            <button
              onClick={() => {
                const updatedOptions = [...options];
                updatedOptions[qIndex].push("");
                setOptions(updatedOptions);
              }}
              className="bg-blue-500 text-white rounded-md px-3 py-1"
            >
              Add Option
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addQuestion}
        className="bg-green-500 text-white rounded-md px-4 py-2 mb-4"
      >
        Add Question
      </button>
      <button
        onClick={submitQuiz}
        className="bg-indigo-500 text-white rounded-md px-4 py-2"
      >
        Submit Quiz
      </button>
    </div>
  );
}
