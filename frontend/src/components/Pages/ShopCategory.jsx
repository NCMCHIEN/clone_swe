import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Item/Item";

const ShopCategory = (props) => {
  const { all_product, searchTerm } = useContext(ShopContext);

  const filteredProducts = all_product.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.category === props.category
  );

  return (
    <div className="shop-category">
      {/* <img className="shopcategory-banner" src={props.banner} alt="" /> */}

      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
