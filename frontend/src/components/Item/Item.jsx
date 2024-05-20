import React from "react";
import "./Item.css";

import { Link } from "react-router-dom";

const Item = (props) => {
  return (
    <div className="item">
      <ul className="container-item">
        <li>
          <div className="products">
            <div className="product-img">
              <div className="item-img-1">
                <img src={props.image} />
                <div className="item-img-2">
                  <img src="https://product.hstatic.net/1000344185/product/tram0516_fe6c557f97944e2dbb0b1f6ea9c2fe43_large.jpg" />
                </div>
              </div>
            </div>
            <div className="product-info">
              <div className="name-product">
                <Link to={`/product/${props.id}`}>
                  <p>{props.name}</p>
                </Link>
              </div>
              <div className="price-product">
                <p className="price-product-sale">{props.new_price} vnd</p>
                <p className="price-product-offer">{props.old_price} vnd</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Item;
