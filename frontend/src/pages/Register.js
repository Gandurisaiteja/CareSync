import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../api/axios";

import "../styles/register.css";


function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "patient",
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
          "/auth/register",
          formData
        );

      alert(
        response.data.message
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response.data.message
      );
    }
  };


  return (

    <div className="register-page">

      <div className="register-card">

        <h2 className="register-title">
          Create Account
        </h2>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            className="register-input"
            placeholder="Enter name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            className="register-input"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="register-input"
            placeholder="Enter password"
            onChange={handleChange}
          />

          <select
            name="role"
            className="register-select"
            onChange={handleChange}
          >

            <option value="patient">
              Patient
            </option>

            <option value="doctor">
              Doctor
            </option>

            <option value="receptionist">
              Receptionist
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

          <button
            type="submit"
            className="register-button"
          >

            Register

          </button>

        </form>

        <p className="register-text">

          Already have account?
          {" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;