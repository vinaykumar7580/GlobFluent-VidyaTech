import { FaUser } from "react-icons/fa";
import LeftSlider from "../Components/LeftSlider";

function UserDashboard() {
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
    </div>
  );
}

export default UserDashboard;
