import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const initialState = { email: "", password: "" };
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //Api call to backend for login
  const LoginSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const res = await axios.post("http://localhost:5000/login", formData);
    const data = res.data;
    console.log(res.data);
    const token = res.data.token;
    if (token) {
      localStorage.setItem("profile", JSON.stringify({ token }));
      navigate("/add");
    } else {
      toast(res.data.message);
    }
  };
  return (
    <>
      <div className="login-page">
        <form className="login-form" onSubmit={LoginSubmit}>
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Login;
