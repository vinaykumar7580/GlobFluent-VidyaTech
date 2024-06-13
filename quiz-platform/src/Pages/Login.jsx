import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = JSON.parse(localStorage.getItem("quiz-users"));

    if (data.email === user.email && data.password === user.password) {
      if (user.role === "user") {
        alert(`Login success!`);
        navigate("/user-dashboard");
      } else if (user.role === "admin") {
        alert(`Login success!`);
        navigate("/admin-dashboard");
      }
    } else {
      alert("Login failed!");
    }

    setData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-blue-500 px-3">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full mt-1 py-2 px-3 rounded-md text-gray-900 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full mt-1 py-2 px-3 rounded-md text-gray-900 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 py-2 rounded-md text-white font-bold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <p className="text-gray-900">Want to register?</p>
          <p className="ml-2">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
