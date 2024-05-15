import React from "react";
import "./Item.css";

import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <ul class="container">
        <li>
          <div class="products">
            <div class="product-img">
              <div class="item-img-1">
                <img src="https://product.hstatic.net/1000344185/product/tram0508-recovered_f586a5875c0744f496cfd6e6cfda9560_large.jpg" />
                <div class="item-img-2">
                  <img src="https://product.hstatic.net/1000344185/product/tram0516_fe6c557f97944e2dbb0b1f6ea9c2fe43_large.jpg" />
                </div>
              </div>
            </div>
            <div class="product-info">
              <div class="name-product">
                <Link to={`/product/${props.id}`}>
                  <p>{props.name}</p>
                </Link>
              </div>
              <div class="price-product">
                <p class="price-product-sale">{props.old_price}vnd</p>
                <p class="price-product-offer">{props.old_price}vnd</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Item;
