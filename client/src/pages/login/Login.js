import React, { useState } from "react";
import "./Login.scss";
import { Link, json, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axiosClient.post("/auth/login", { email, password });
      setItem(KEY_ACCESS_TOKEN, result.accessToken);
      navigate("/");
    } catch (e) {
      return json({ Error: e.message });
    }
  }

  return (
    <div className="Login">
      <div className="Login-box">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>

          <input
            type="password"
            className="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input type="submit" className="submit" />
        </form>
        <p className="text-center">
          Do not have a account ?{" "}
          <Link to="/signup">
            <span className="text-blue-500 underline hover:text-blue-900">
              SignUP
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
