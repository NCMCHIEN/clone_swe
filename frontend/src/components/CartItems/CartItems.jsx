import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";

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

    const formatCurrency = (value) => {
      if (!value) return value;
      const stringValue = value.toString();
      const parts = stringValue.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return parts.join(",");
    };

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
      alert("Mua hàng thành công!");

      clearCart(); // Gọi hàm clearCart để xóa toàn bộ giỏ hàng
    } catch (error) {
      console.error("Lỗi khi mua hàng:", error);
      alert(`Không thể hoàn tất mua hàng: ${error.message}`);
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
    <div className="cartitems">
      <h4>shopping bag</h4>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Delete</p>
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
                    <p>{formatCurrency(product.new_price)}</p>
                    <button className="cartitems-quantity">
                      {sizes[size]}
                    </button>
                    <p>{formatCurrency(product.new_price * sizes[size])}</p>
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
          <div className="cartitems-total-item">
            <h3>total</h3>
            <h3>{formatCurrency(getTotalCartAmount())}₫</h3>
          </div>
          <div className="cartitems-checkout">
            <Link to="/CheckOut">
              <button onClick={handleCheckout}>check out</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
