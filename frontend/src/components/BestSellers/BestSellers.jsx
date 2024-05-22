import React, { useEffect, useContext, useState } from "react";
import "./BestSellers.css";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";

export const BestSellers = () => {
  const [newCollection, setNewCollection] = useState([]);
  const { searchTerm } = useContext(ShopContext);

  useEffect(() => {
    fetch("http://localhost:4010/bestsellers")
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  const filteredCollection = newCollection.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="new-bestsellers">
      {/* <h1>NEW bestsellers</h1> */}
      {/* <hr /> */}
      <div className="bestsellers">
        {filteredCollection.map((item, i) => (
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
    </div>
  );
};
