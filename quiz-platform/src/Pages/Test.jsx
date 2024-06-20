import { FaUser } from "react-icons/fa";
import LeftSlider from "../Components/LeftSlider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  const params = useParams();
  const navigate = useNavigate();
  let quizzes = JSON.parse(localStorage.getItem("quizes")) || [];
  console.log(quizzes);

  useEffect(() => {
    for (let i = 0; i <= quizzes.length - 1; i++) {
      if (quizzes[i].title === params.title) {
        setData(quizzes[i].questions);
        break;
      }
    }
  }, []);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem("quiz-answers"));
    if (savedAnswers) {
      setAnswers(savedAnswers);
    }

    const savedSubmitted = JSON.parse(localStorage.getItem("quiz-submitted"));
    if (savedSubmitted) {
      setSubmitted(savedSubmitted);
    }

    const savedTimeLeft = JSON.parse(localStorage.getItem("quiz-time-left"));
    if (savedTimeLeft) {
      setTimeLeft(savedTimeLeft);
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      localStorage.removeItem("quiz-answers");
      localStorage.removeItem("quiz-time-left");
    } else {
      localStorage.setItem("quiz-answers", JSON.stringify(answers));
      localStorage.setItem("quiz-time-left", JSON.stringify(timeLeft));
      localStorage.setItem("quiz-submitted", JSON.stringify(submitted));
    }
  }, [answers, submitted, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    if (!paused) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, paused]);

  const handleChange = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    let scoreArr=JSON.parse(sessionStorage.getItem("score")) || [];
    let score = 0;
    data?.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score++;
      }
    });
    let title = params.title;

    let res=[...scoreArr, {title, score}]
    let ress=res.reverse()
    
    sessionStorage.setItem("score", JSON.stringify(ress));
    setScore(score);
    setSubmitted(true);
    setTimeLeft(0);
    localStorage.removeItem("quiz-answers");
    localStorage.removeItem("quiz-time-left");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePause = () => {
    setPaused(true);
  };

  const handleResume = () => {
    setPaused(false);
  };

  let user = JSON.parse(localStorage.getItem("quiz-users"));

  return (
    <div>
      <div className="relative h-52 bg-gradient-to-br from-blue-900 to-blue-500">
        <div className="absolute w-full top-0 flex justify-between items-center py-3 px-6">
          <div className="z-10">
            <LeftSlider />
          </div>
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

      <div className="w-full md:w-4/5 m-auto mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center gap-4">
            <h3 className="text-xl font-bold mb-4 font-serif">
              {params.title}
            </h3>
            <p className="text-red-500 bg-red-100 font-bold p-2 border border-red-500 rounded">
              {formatTime(timeLeft)}
            </p>
          </div>

          <div className="mt-4">
            {data &&
              data?.map((q, index) => (
                <div key={index} className="mt-2 p-3 border rounded-md w-full">
                  <h1 className="text-md font-bold">
                    {index + 1}. {q.question}
                  </h1>
                  {q.options.map((option, i) => (
                    <div
                      key={i}
                      className={`flex items-center mt-1 p-2 border rounded-md ${
                        submitted && i === q.correct
                          ? "border-green-500 bg-green-100"
                          : ""
                      } ${
                        submitted && i === answers[index] && i !== q.correct
                          ? "border-red-500 bg-red-100"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={answers[index] === i}
                        onChange={() => handleChange(index, i)}
                        className="form-radio mr-2 cursor-pointer"
                        disabled={submitted}
                      />
                      <span>{option}</span>
                      {submitted && i === q.correct ? (
                        <span className="text-green-500 ml-2">
                          Correct Answer
                        </span>
                      ) : null}
                      {submitted && i === answers[index] && i !== q.correct ? (
                        <span className="text-red-500 ml-2">Your Answer</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            {!submitted ? (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
                {!paused ? (
                  <button
                    onClick={handlePause}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={handleResume}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Resume
                  </button>
                )}
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-lg text-green-500 border border-green-500 rounded p-1.5 font-bold mt-4">
                  Score: {score}/{data && data?.length}
                </p>
                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                >
                  Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
