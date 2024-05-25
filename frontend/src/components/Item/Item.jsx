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

  const formatCurrency = (value) => {
    if (!value) return value;
    const stringValue = value.toString();
    const parts = stringValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

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
                <p className="price-product-sale">
                  {formatCurrency(props.new_price)} VND
                </p>
                {props.old_price !== 0 && (
                  <p className="price-product-offer">
                    {formatCurrency(props.old_price)} VND
                  </p>
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
