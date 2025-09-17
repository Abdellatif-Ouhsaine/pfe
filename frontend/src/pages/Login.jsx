import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ima from "./1.png";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8000/api/login", formData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // 👇 Redirection automatique selon le rôle
    const redirectTo = res.data.redirect_to || "/";
    navigate(redirectTo);
  } catch (err) {
    setError(err.response?.data?.error || "Login failed");
  }
};



  return (
    <div className="auth-container">
      <div className="left-section">
        <div className="left-content">
          <h1>Welcome Back</h1>
          <p>
            Login to access your personalized dashboard and continue your
            journey with us.
          </p>
          <div className="image-container">
            <img
              src={ima}
              alt="Happy people enjoying food delivery"
              className="auth-image"
            />
          </div>
        </div>
      </div>

      <div className="right-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn">
            Login
          </button>

          <div className="auth-link">
            Don't have an account? <Link to="/signin">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
