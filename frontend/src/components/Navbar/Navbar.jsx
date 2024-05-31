import React, { useContext, useState } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const { getTotalCartItems, searchTerm, setSearchTerm } =
    useContext(ShopContext);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  return (
    <div className="swe-header">
      <div className="nav-menu">
        <Link to="/CheckOut">
          <p>test checkout</p>
        </Link>
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
      </div>
      <div className="nav-logo">
        <Link to="/">
          <img
            src="https://file.hstatic.net/1000344185/file/logo-full_20ce9553ecdf47b3becda4ff02971466.png"
            alt=""
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
          <p className="nav-sign-button" onClick={openPopup}>
            bag ({getTotalCartItems()})
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
