import React, { useState, useContext } from "react";
import "./ProductDisplay.css";

import { ShopContext } from "../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="display-body">
      {/* <!-- left  --> */}
      <div className="display-left-content">
        <p>
          <img src={product.image} alt="product" />
        </p>
      </div>
      {/* <!-- end left  --> */}
      {/* <!-- right --> */}
      <div className="display-right-content">
        <h2>{product.name}</h2>
        <hr />
        <div className="price-product-saleoffer">
          <p className="price-product-sale">{product.new_price} VND</p>
          <p className="price-product-offer">{product.old_price} VND</p>
        </div>
        <div className="select-size">
          <p>please select size</p>
          <div className="select-size-button">
            {["S", "M", "L", "XL"].map((size) => (
              <button key={size} onClick={() => handleSizeSelect(size)}>
                {size}
              </button>
            ))}
          </div>
          <p>quantity remaining: {product.quantity}</p>
        </div>
        {/* Ẩn nút "add to bag" khi số lượng sản phẩm đã hết */}
        {product.quantity > 0 && (
          <div className="button-detail">
            <button
              className="button-detail-addtocart"
              onClick={() => {
                if (selectedSize) {
                  addToCart(product.id, selectedSize);
                } else {
                  alert("Please select a size");
                }
              }}
            >
              add to bag
            </button>
            <button className="button-detail-help">help me!</button>
          </div>
        )}
        <hr />
        <div className="infoabout-shirt">
          | SWE® | {product.name} <br />
          MATERIAL: COTTON 100% <br />
          SIZE: S/M/L/XL
          <br />
          <br />
          {product.name} - Chiếc áo với thiết kế dễ thương nằm trong SWE Summer
          Collection 2024. Áo có hoạ tiết trái tim được in tràn viền rất bắt mắt
          và nổi bật cùng điểm nhấn chữ Kid Atelier được in phía trên ngực trái.
          Đây chắc chắn sẽ là một sản phẩm rất phù hợp dành cho các cặp đôi.
          <br />
          <br />
          Áo thun SWE vẫn được sử dụng COTTON 100% thuần tự nhiên 2 chiều, định
          lượng 250gsm, thiết kế form SWE regular nên chất lượng các bạn có thể
          hoàn toàn yên tâm với sản phẩm nhà SWE.
          <br />
          <br />
          Form áo được Fit size theo form và tiêu chuẩn tương đối của người Việt
          Nam, nếu bạn đang cân nhắc giữa hai size, nên chọn size lớn hơn.
          <br />
          Size S: Chiều cao dưới 1m65, cân nặng dưới 55kg
          <br />
          Size M: Chiều cao từ 1m65 - 1m75, cân nặng dưới 65kg
          <br />
          Size L: Chiều cao từ 1m75 - 1m85, cân nặng dưới 90kg
          <br />
          Size XL: Chiều cao từ 1m85 trở lên, cân nặng dưới 120kg
        </div>
      </div>
      {/* <!-- end right  --> */}
    </div>
  );
};
