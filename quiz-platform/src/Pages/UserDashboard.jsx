import { FaUser } from "react-icons/fa";
import LeftSlider from "../Components/LeftSlider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    let quizess = JSON.parse(localStorage.getItem("quizes")) || [];
    setQuizData(quizess);
  };

  let user = JSON.parse(localStorage.getItem("quiz-users"));
  let scoreArr=JSON.parse(localStorage.getItem("score"))
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
          <div className="text-2xl font-bold text-center font-serif">
            All Quiz's
          </div>
          <div className="p-4">
      {quizData.map((el, index) => {
        const scoreData = scoreArr?.find((sco) => sco.title === el.title);

        return (
          <div
            key={index}
            className="mt-2 p-3 border rounded-md w-full cursor-pointer"
          >
            <Link to={`/test/${el.title}`}>
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-md font-bold">{el.title}</h1>
                </div>
                <div>
                  {scoreData ? (
                    <div className="text-green-500 font-bold border border-green-500 px-2 py-1 rounded">
                      {scoreData.score}
                    </div>
                  ) : (
                    <div className="text-red-500 font-bold border border-red-500 p-1 rounded">
                      Pending
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
