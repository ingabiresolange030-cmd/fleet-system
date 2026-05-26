// ==========================================
// src/components/Register.js
// ==========================================

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/register", formData);

      alert("Account created successfully");
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Registration error");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-80">

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Create Account
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {" "}Login
          </span>
        </p>

      </form>

    </div>
  );
}

export default Register;