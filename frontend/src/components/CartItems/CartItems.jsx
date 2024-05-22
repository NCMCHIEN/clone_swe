import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    clearCart,
  } = useContext(ShopContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleCheckout = async () => {
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

    try {
      const response = await fetch("http://localhost:4010/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ items, phoneNumber, address }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      // Cập nhật số lượng sản phẩm đã bán (sold)
      cartProducts.forEach(async (product) => {
        Object.keys(cartItems[product.id]).forEach(async (size) => {
          const updatedSold = product.sold + cartItems[product.id][size];
          await fetch(`http://localhost:4005/updateproductsold/${product.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token"),
            },
            body: JSON.stringify({ sold: updatedSold }),
          });
        });
      });

      const result = await response.json();
      alert("Purchase successful!");

      clearCart(); // Gọi hàm clearCart để xóa toàn bộ giỏ hàng
    } catch (error) {
      console.error("Error during purchase:", error);
      alert(`Failed to complete purchase: ${error.message}`);
    }
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        const sizes = cartItems[product.id];
        if (sizes) {
          return Object.keys(sizes).map(
            (size) =>
              sizes[size] > 0 && (
                <div key={`${product.id}-${size}`}>
                  <div className="cartitems-format cartitems-format-main">
                    <img
                      src={product.image}
                      alt=""
                      className="carticon-product-icon"
                    />
                    <p>{product.name}</p>
                    <p>{size}</p>
                    <p>${product.new_price}</p>
                    <button className="cartitems-quantity">
                      {sizes[size]}
                    </button>
                    <p>${product.new_price * sizes[size]}</p>
                    <img
                      className="cartitems-remove-icon"
                      src={remove_icon}
                      onClick={() => {
                        removeFromCart(product.id, size);
                      }}
                      alt=""
                    />
                  </div>
                  <hr />
                </div>
              )
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <div className="contact-info">
            <h2>Contact Information</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
