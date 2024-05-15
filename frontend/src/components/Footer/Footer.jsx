import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="swe-footer">
      <div className="footer-social">
        <p>facebook</p>
        <p>instagram</p>
      </div>
      <div className="footer-logo">
        <img
          src="https://theme.hstatic.net/1000344185/1001008743/14/imagelogo.png?v=607"
          alt=""
        />
      </div>
      <div className="footer-info">
        <p>about us</p>
        <p>store locations</p>
        <p>return policy</p>
      </div>
    </div>
  );
};
