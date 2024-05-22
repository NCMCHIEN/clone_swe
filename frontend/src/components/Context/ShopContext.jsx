import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300; index++) {
    cart[index] = {};
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [searchTerm, setSearchTerm] = useState(""); // Thêm trạng thái tìm kiếm

  useEffect(() => {
    fetch("http://localhost:4010/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4010/getcart", {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: null,
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = (itemId, size) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (!newCartItems[itemId]) {
        newCartItems[itemId] = {};
      }
      if (!newCartItems[itemId][size]) {
        newCartItems[itemId][size] = 0;
      }
      newCartItems[itemId][size] += 1;
      return newCartItems;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4010/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId, size) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] && newCartItems[itemId][size]) {
        newCartItems[itemId][size] -= 1;
        if (newCartItems[itemId][size] <= 0) {
          delete newCartItems[itemId][size];
        }
      }
      return newCartItems;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4010/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId, size: size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          let itemInfo = all_product.find(
            (product) => product.id === Number(item)
          );
          totalAmount += itemInfo.new_price * cartItems[item][size];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          totalItem += cartItems[item][size];
        }
      }
    }
    return totalItem;
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
    searchTerm, // Thêm searchTerm vào context
    setSearchTerm, // Thêm setSearchTerm vào context
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
