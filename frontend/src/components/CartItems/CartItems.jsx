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
      <div className="cartitems-format-main">
        <p>Sản phẩm</p>
        <p>Tiêu đề</p>
        <p>Kích thước</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng</p>
        <p>Xóa</p>
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
          <h1>Tổng giỏ hàng</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Tổng phụ</p>
              <p>{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Phí vận chuyển</p>
              <p>Miễn phí</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng cộng</h3>
              <h3>{formatCurrency(getTotalCartAmount())}₫</h3>
            </div>
          </div>
          <div className="contact-info">
            <h2>Thông tin liên hệ</h2>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button onClick={handleCheckout}>TIẾN HÀNH THANH TOÁN</button>
        </div>
        <div className="cartitems-promocode">
          <p>Nếu bạn có mã khuyến mãi, hãy nhập vào đây</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="mã khuyến mãi" />
            <button>Nộp</button>
          </div>
        </div>
      </div>
    </div>
  );
};
