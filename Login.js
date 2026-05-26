// ==========================================
// src/components/Login.js
// LOGIN WITH TAILWIND CSS
// ==========================================

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // ==========================
  // HANDLE CHANGE
  // ==========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ==========================
  // HANDLE LOGIN
  // ==========================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      if (res.data.success === true) {

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert("Invalid Username or Password");

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  // ==========================
  // UI
  // ==========================
  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-80">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          LOGIN FORM
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-4 text-sm">

          Don't have an account?

          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer ml-1"
          >
            Create Account
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;