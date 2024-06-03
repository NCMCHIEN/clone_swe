import React, { useContext, useState } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { getTotalCartItems, searchTerm, setSearchTerm } =
    useContext(ShopContext);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isNavMenuVisible, setIsNavMenuVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const toggleNavMenu = () => {
    setIsNavMenuVisible(!isNavMenuVisible);
  };

  return (
    <div className="swe-header">
      <div className="nav-menu-container">
        <button className="btn-open" onClick={toggleNavMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {/* Thêm overlay để hiển thị lớp nền mờ */}
        <div
          className={`overlay ${isNavMenuVisible ? "show" : ""}`}
          onClick={toggleNavMenu}
        ></div>
        <div className={`nav-menu ${isNavMenuVisible ? "show" : ""}`}>
          <button className="close-sidebar-button" onClick={toggleNavMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <Link to="/mens">
            <p>men's</p>
          </Link>
          <Link to="/womens">
            <p>women's</p>
          </Link>
          <Link to="/tops">
            <p>tops</p>
          </Link>
          <Link to="/bottoms">
            <p>bottoms</p>
          </Link>
          <Link to="/accessories">
            <p>accessories</p>
          </Link>
          <div className="nav-menu-account">
            {localStorage.getItem("auth-token") ? (
              <p
                className="logout"
                onClick={() => {
                  localStorage.removeItem("auth-token");
                  window.location.replace("/");
                }}
              >
                logout
              </p>
            ) : (
              <Link style={{ textDecoration: "none" }} to="/login">
                <p>account</p>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="nav-logo">
        <Link to="/">
          <img
            src="https://file.hstatic.net/1000344185/file/logo-full_20ce9553ecdf47b3becda4ff02971466.png"
            alt="Logo 1"
          />
          <img
            src="https://file.hstatic.net/1000344185/file/logo-swe_910a23eb7d84446d96937ca62f6d3751.png"
            alt="Logo 2"
          />
        </Link>
      </div>
      <div className="nav-sign">
        {localStorage.getItem("auth-token") ? (
          <p
            className="logout"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            logout
          </p>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <p>account</p>
          </Link>
        )}
        <p onClick={toggleSearchBar}>search</p>
        {isSearchBarVisible && (
          <SearchBar
            searchTerm={searchTerm}
            handleSearch={(e) => setSearchTerm(e.target.value)}
          />
        )}
        <Link style={{ textDecoration: "none" }} to="/cart">
          <p className="nav-sign-button">bag ({getTotalCartItems()})</p>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/cart"
          className="btn-shopping-cart"
        >
          <FontAwesomeIcon icon={faBagShopping} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
