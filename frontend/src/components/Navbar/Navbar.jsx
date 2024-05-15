import React, { useContext, useState } from "react";
import "./Navbar.css";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom"; // import Link từ react-router-dom
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className="swe-header">
      <div className="nav-menu">
        <Link to="/hoalen">
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
          <p className="logout"
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
        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <p>search</p>
        <p className="nav-sign-button" onClick={openPopup}>
          bag ({getTotalCartItems()})
        </p>
        {/* pop up bag  */}
        <div className="pop-up" id="pop-up-1">
          <div className="overlay">
            {all_product.map((product) => {
              if (cartItems[product.id] > 0) {
                return (
                  <div className="content" key={product.id}>
                    <div className="close-btn" onClick={openPopup}>
                      close
                    </div>
                    <h1>shopping bag</h1>
                    <hr />
                    <div className="pop-up-bag">
                      <div className="pop-up-bag-img">
                        <img src={product.image} alt="" />
                      </div>
                      <div className="pop-up-bag-name">
                        <p>{product.name}</p>
                        <p>{cartItems[product.id]}</p>
                      </div>
                      <div className="pop-up-bag-price">
                        <button onClick={() => removeFromCart(product.id)}>
                          &times;
                        </button>
                        <p>{product.new_price}vnd</p>
                      </div>
                    </div>
                    <hr />
                    <div className="total">
                      <div className="total-left">
                        total
                        <br />
                        shipping calculated at checkout
                      </div>
                      <div className="total-right">
                        {product.new_price * cartItems[product.id]}vnd
                      </div>
                    </div>
                    <div className="button-detail-bag">
                      <Link to="/" onClick={openPopup}>
                        <button className="button-detail-continueshopping">
                          continue shopping
                        </button>
                      </Link>

                      <button className="button-detail-checkout">
                        checkout
                      </button>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* end pop up bag  */}
      </div>
    </div>
  );
};

export default Navbar;
