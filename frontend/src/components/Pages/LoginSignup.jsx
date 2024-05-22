import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  // Trạng thái riêng biệt cho phần đăng nhập và đăng ký
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login funciotn chay duowc", formData);
    let responseData;
    await fetch("http://localhost:4010/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("signup funciotn chay duowc", formData);
    let responseData;
    await fetch("http://localhost:4010/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div class="login-body">
      {/* Sign in */}
      <div class="sign-in">
        <p>sign in</p>
        <div class="customer-sign-in">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="mật khẩu"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <div class="btn-sign-in">
          <button class="continue-signin" onClick={login}>
            sign in
          </button>
          <button class="forget-pass">quên mật khẩu</button>
        </div>
      </div>
      {/* Register */}
      <div class="register">
        <p>register</p>
        <div class="customer-register">
          <input
            type="text"
            placeholder="họ và tên"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="mật khẩu"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <div class="btn-register">
          <button class="continue-createacc" onClick={signup}>
            create account
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginSignup;
