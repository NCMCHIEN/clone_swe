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
    console.log("login function running", loginData);
    let responseData;
    await fetch("http://localhost:4010/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
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
    console.log("signup function running", registerData);
    let responseData;
    await fetch("http://localhost:4010/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
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
    <div className="login-body">
      {/* Sign in */}
      <div className="sign-in">
        <p>sign in</p>
        <div className="customer-sign-in">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            placeholder="mật khẩu"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
        </div>
        <div className="btn-sign-in">
          <button className="continue-signin" onClick={login}>
            sign in
          </button>
          <button className="forget-pass">quên mật khẩu</button>
        </div>
      </div>
      {/* Register */}
      <div className="register">
        <p>register</p>
        <div className="customer-register">
          <input
            type="text"
            placeholder="họ và tên"
            name="username"
            value={registerData.username}
            onChange={handleRegisterChange}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            placeholder="mật khẩu"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
          />
        </div>
        <div className="btn-register">
          <button className="continue-createacc" onClick={signup}>
            create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
