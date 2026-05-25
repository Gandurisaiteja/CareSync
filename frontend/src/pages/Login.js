import React, {
  useState,
} from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import API from "../api/axios";

import "../styles/login.css";


function Login() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };


  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/auth/login",
          formData
        );

      const data =
        response.data;

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // ROLE BASED REDIRECT
      if (
        data.user.role ===
        "patient"
      ) {

        navigate("/patient");
      }

      else if (
        data.user.role ===
        "doctor"
      ) {

        navigate("/doctor");
      }

      else if (
        data.user.role ===
        "admin"
      ) {

        navigate("/admin");
      }

      else if (
        data.user.role ===
        "receptionist"
      ) {

        navigate(
          "/receptionist"
        );
      }

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">
          CareSync Login
        </h2>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="login-button"
          >

            Login

          </button>

        </form>

        <p className="login-text">

          Don't have account?
          {" "}

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;