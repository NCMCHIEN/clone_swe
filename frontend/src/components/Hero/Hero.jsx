import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom"; // import Link từ react-router-dom

export const Hero = () => {
  return (
    <div className="swe-body">
      <div className="left-content">
        <Link to="/NewCollections">new arrivals</Link>
      </div>
      <div className="right-content">
        <Link to="/NewCollections">best sellers</Link>
      </div>
    </div>
  );
};
