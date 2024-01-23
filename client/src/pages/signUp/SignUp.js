import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import axiosClient from "../../utils/axiosClient";

function SignUP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
     await axiosClient.post("/auth/login", {
      name,
      email,
      password,
    });
  }

  return (
    <div className="SignUp">
      <div className="SignUp-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name </label>
          <input
            type="text"
            className="name"
            id="name"
            placeholder="Anand Kumar"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            placeholder="abc@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            placeholder="@#$FItiy5646"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="submit" />
        </form>
        <p className="text-center">
          Already have an account ?{" "}
          <Link to="/login">
            <span className="text-blue-500 underline hover:text-blue-900">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUP;
