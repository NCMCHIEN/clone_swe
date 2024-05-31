import React, { useContext, useState } from "react";
import "./CheckOut.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export const CheckOut = () => {
  const { all_product, cartItems, getTotalCartAmount } =
    useContext(ShopContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const cartProducts = all_product.filter((product) =>
    Object.keys(cartItems[product.id] || {}).some(
      (size) => cartItems[product.id][size] > 0
    )
  );

  const items = cartProducts.flatMap((product) =>
    Object.keys(cartItems[product.id]).map((size) => ({
      productId: product.id,
      size,
      quantity: cartItems[product.id][size],
      price: product.new_price,
    }))
  );

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:4010/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ items, phoneNumber, address, fullname, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      // Xử lý sau khi thanh toán thành công
      console.log("Thanh toán thành công");
    } catch (error) {
      console.error("Thanh toán thất bại:", error);
    }
  };
  const formatCurrency = (value) => {
    if (!value) return value;
    const stringValue = value.toString();
    const parts = stringValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  return (
    <div className="checkout-container">
      <div className="left-checkout">
        <h1>SWE (STREETWEAREAZY)</h1>
        <br />
        <div className="breadcrum-checkout">
          <Link to="/cart">cart</Link> <img src={arrow_icon} alt="" /> Shipping
          Information
        </div>
        <br />
        <p>Shipping Information</p>
        <br />

        <input
          type="text"
          placeholder="Full name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <p className="error-message" id="fullname-error"></p>
        <input
          type="text"
          placeholder="Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <p className="error-message" id="phone-error"></p>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p class="error-message" id="email-error"></p>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p className="error-message" id="address-error"></p>
        <p>Payment Method</p>
        <br />

        <div className="ship-cod">
          <input type="checkbox" id="cod" /> Thanh toán khi nhận hàng
        </div>
        <div className="checkbox-finish">
          <Link to="/cart">cart</Link>
          <button onClick={handleCheckout}>Finish your order</button>
        </div>
        <br />
        <br />

        <p style={{ textAlign: "center" }}>Powered by Haravan</p>
      </div>
      <div className="right-checkout">
        {cartProducts.map((product) => (
          <div className="product-checkout" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              width="100px"
              height="100px"
            />
            <p>{product.name}</p>
            <p>{product.new_price} vnd</p>
          </div>
        ))}
        <hr style={{ width: "590px" }} />
        <div className="subtotal">
          <p>Subtotal</p>
          <p>{/* Tính toán tổng phụ */}</p>
        </div>
        <hr style={{ width: "590px" }} />
        <div className="total">
          <p>Total</p>
          <p>{formatCurrency(getTotalCartAmount())}₫</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
