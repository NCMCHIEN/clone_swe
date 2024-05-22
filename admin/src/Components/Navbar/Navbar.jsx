import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

function Navbar() {
  return (
    <div className="navbar">
      <img
        src="https://file.hstatic.net/1000344185/file/logo-swe_910a23eb7d84446d96937ca62f6d3751.png"
        alt=""
        className="nav-logo"
      />
    </div>
  );
}

export default Navbar;
