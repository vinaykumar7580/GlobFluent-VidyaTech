import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";

function AdminDashboard() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [chevUp, setChevUp] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    let quizess = JSON.parse(localStorage.getItem("quizes")) || [];
    setQuizData(quizess);
  };

  const addQuestion = () => {
    if (currentQuestion && correctOption !== null) {
      const newQuestion = {
        question: currentQuestion,
        options: currentOptions,
        correct: correctOption,
      };
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion("");
      setCurrentOptions(["", "", "", ""]);
      setCorrectOption(null);
    } else {
      alert("Please complete the question and select the correct answer.");
    }
  };

  const saveQuiz = () => {
    if (quizTitle && questions.length > 0) {
      let quizes = JSON.parse(localStorage.getItem("quizes")) || [];
      const quiz = { title: quizTitle, questions };
      console.log("Quiz saved:", quiz);
      let result = [...quizes, quiz];
      localStorage.setItem("quizes", JSON.stringify(result));
      alert("Quiz saved successfully!");
      setQuizTitle("");
      handleGetData();
    } else {
      alert("Please add a title and at least one question.");
    }
  };

  const handleChev = (index) => {
    setOpenIndex(index);
    if (chevUp) {
      setChevUp(false);
    } else {
      setChevUp(true);
    }
  };

  let user = JSON.parse(localStorage.getItem("quiz-users"));

  console.log("quizdata", quizData);
  return (
    <div>
      <div className="relative h-52 bg-gradient-to-br from-blue-900 to-blue-500">
        <div className="absolute w-full top-0 flex justify-between items-center py-3 px-6">
          <div className="z-10"></div>
          <div className="p-2 bg-blue-500 text-white rounded-full flex justify-center items-center gap-1">
            <FaUser />
            <span>{user && user?.name}</span>
          </div>
        </div>
        <div className="absolute w-full top-20 flex justify-center items-center px-6">
          <div>
            <img
              className="full h-auto"
              src="https://img.icons8.com/?size=64&id=pg4L7zzflf1e&format=png"
              alt="image"
            />
            <h1 className="text-md text-white mt-3 text-center">Let's play!</h1>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 m-auto mt-4">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="text-2xl font-bold text-center font-serif">
            Create a Quiz
          </div>
          <div className="mb-4 mt-3">
            <label className="block text-gray-700">Quiz Title:</label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Question:</label>
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Options:</label>
            {currentOptions.map((option, index) => (
              <div key={index} className="flex items-center mt-1">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentOptions];
                    newOptions[index] = e.target.value;
                    setCurrentOptions(newOptions);
                  }}
                  className="p-2 border rounded-md w-full mr-2"
                />
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctOption === index}
                  onChange={() => setCorrectOption(index)}
                  className="form-radio"
                />
              </div>
            ))}
          </div>
          <button
            onClick={addQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Question
          </button>
          <button
            onClick={saveQuiz}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
          >
            Save Quiz
          </button>
        </div>
      </div>

      <div className="w-full md:w-4/5 m-auto mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="text-2xl font-bold text-center font-serif">
            All Quiz's
          </div>
          <div>
            {quizData &&
              quizData?.map((el, index) => (
                <div
                  key={index}
                  className="mt-2 p-3 border rounded-md w-full cursor-pointer"
                  onClick={() => handleChev(index)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-md font-bold">{el.title}</h1>
                    </div>
                    <div>
                      {chevUp && index == openIndex ? (
                        <div>
                          <BiChevronUp size={"30px"} />
                        </div>
                      ) : (
                        <div>
                          <BiChevronDown size={"30px"} />
                        </div>
                      )}
                    </div>
                  </div>
                  {chevUp && index == openIndex ? (
                    <div>
                      {el.questions?.map((que, index) => (
                        <div
                          key={index}
                          className="mt-2 p-3 border rounded-md w-full"
                        >
                          <h1 className="text-md font-bold">
                            {index + 1}. {que.question}
                          </h1>
                          <div>
                            {que.options?.map((opt, index) => (
                              <div
                                key={index}
                                className={`mt-2 p-3 border rounded-md w-full ${
                                  index === que.correct
                                    ? "border-1 border-green-500 bg-green-100"
                                    : ""
                                }`}
                              >
                                <h2>
                                  {index + 1}) {opt}
                                </h2>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
