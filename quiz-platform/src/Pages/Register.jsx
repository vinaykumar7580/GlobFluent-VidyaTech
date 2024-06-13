import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    if (data.name && data.email && data.password && data.role) {
      localStorage.setItem("quiz-users", JSON.stringify(data));
      alert(`Registration success!`);
      navigate("/");
    } else {
      alert("Registration failed!");
    }

    setData({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-900 to-blue-500 px-3">
      <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full mt-1 py-2 px-3 rounded-md text-gray-900 border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
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
          <div className="mt-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              required
              className="w-full mt-1 py-2 px-3 rounded-md text-gray-900 border border-gray-400 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
          <p className="text-gray-900">Already registered?</p>
          <p className="ml-2">
            <Link to="/" className="text-blue-500 hover:text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
