import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div class="display-body">
      {/* <!-- left  --> */}
      <div class="display-left-content">
        <p>
          <img src={product.image} />
        </p>
      </div>
      {/* <!-- end left  --> */}
      {/* <!-- right --> */}
      <div class="display-right-content">
        <h2>{product.name}</h2>
        <hr />
        <div class="price-product-saleoffer">
          <p class="price-product-sale">{product.new_price} VND</p>
          <p class="price-product-offer">{product.old_price} VND</p>
        </div>
        <div class="select-size">
          <p>please select size</p>
          <div class="select-size-button">
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
          </div>
          <p>quantity remaining: {product.quantity}</p>
        </div>
        <div class="button-detail">
          <button
            class="button-detail-addtocart"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            add to bag
          </button>
          <button class="button-detail-help">help me!</button>
        </div>
        <hr />
        <div class="infoabout-shirt">
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
