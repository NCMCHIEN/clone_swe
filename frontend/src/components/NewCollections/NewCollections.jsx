import React, { useEffect, useContext, useState } from "react";
import "./NewCollections.css";
import Item from "../Item/Item";
import { ShopContext } from "../Context/ShopContext";

export const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const { searchTerm } = useContext(ShopContext);

  useEffect(() => {
    fetch("http://localhost:4010/newcollection")
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  const filteredCollection = newCollection.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="new-collections">
      {/* <h1>NEW COLLECTIONS</h1>
      <hr /> */}
      <div className="collections">
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
