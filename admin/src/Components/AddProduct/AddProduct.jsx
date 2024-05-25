import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
    quantity: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const formatCurrency = (value) => {
    if (!value) return value;
    const stringValue = value.toString();
    const parts = stringValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  const parseCurrency = (value) => {
    if (!value) return value;
    return value.replace(/\./g, "");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "old_price" || name === "new_price") {
      const parsedValue = parseCurrency(value);
      setProductDetails({ ...productDetails, [name]: parsedValue });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = {
      ...productDetails,
      old_price: parseCurrency(productDetails.old_price),
      new_price: parseCurrency(productDetails.new_price),
    };

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4010/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4010/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("product added") : alert("failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Tên sản phẩm</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Nhập tên sản phẩm"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Giá cũ</p>
          <input
            value={formatCurrency(productDetails.old_price)}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Nhập giá cũ"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Giá mới</p>
          <input
            value={formatCurrency(productDetails.new_price)}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Nhập giá mới"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Số lượng</p>
        <input
          value={productDetails.quantity}
          onChange={changeHandler}
          type="number"
          name="quantity"
          placeholder="Nhập số lượng"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Danh mục sản phẩm</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="accessorie">Accessories</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
        </label>

        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        THÊM SẢN PHẨM
      </button>
    </div>
  );
};

export default AddProduct;
