import React from "react";
import "./Item.css";

import { Link } from "react-router-dom";

const Item = (props) => {
  // Tính phần trăm giảm giá
  const discountPercentage =
    props.old_price !== 0
      ? Math.round(
          ((props.old_price - props.new_price) / props.old_price) * 100
        )
      : 0;

  return (
    <div className="item">
      <ul className="container-item">
        <li>
          <div className="products">
            <div className="product-img">
              <div className="item-img-1">
                <img src={props.image} alt="Product" />
                <div className="item-img-2">
                  <img src={props.image_second} alt="Product" />
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
                {props.old_price !== 0 && (
                  <p className="price-discount">-{discountPercentage}%</p>
                )}
                <p className="price-product-sale">{props.new_price} vnd</p>
                {props.old_price !== 0 && (
                  <p className="price-product-offer">{props.old_price} vnd</p>
                )}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Item;
