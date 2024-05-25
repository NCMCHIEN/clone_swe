import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4010/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4010/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  const updatePrice = async (id, field, value) => {
    const updatedValue = value.replace(/\./g, ""); // Loại bỏ dấu chấm trước khi gửi lên server
    await fetch("http://localhost:4010/updateproductprice", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, field, value: updatedValue }),
    });
    fetchInfo();
  };

  const handlePriceChange = (index, field, value) => {
    const updatedProducts = [...allproducts];
    updatedProducts[index][field] = value;
    setAllProducts(updatedProducts);
  };

  const formatCurrency = (value) => {
    if (!value) return value;
    const stringValue = value.toString();
    const parts = stringValue.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  };

  return (
    <div className="list-product">
      <h1>Danh sách tất cả sản phẩm</h1>
      <div className="listproduct-format-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá cũ</p>
        <p>Giá mới</p>
        <p>Danh mục</p>
        <p>Số lượng</p>
        <p>Xóa</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img
                className="listproduct-product-icon"
                src={product.image}
                alt={product.name}
              />
              <p>{product.name}</p>
              <input
                type="text"
                value={formatCurrency(product.old_price)}
                onChange={(e) =>
                  handlePriceChange(index, "old_price", e.target.value)
                }
                onBlur={(e) =>
                  updatePrice(product.id, "old_price", e.target.value)
                }
              />{" "}
              {/* VND */}
              <input
                type="text"
                value={formatCurrency(product.new_price)}
                onChange={(e) =>
                  handlePriceChange(index, "new_price", e.target.value)
                }
                onBlur={(e) =>
                  updatePrice(product.id, "new_price", e.target.value)
                }
              />{" "}
              {/* VND */}
              <p>{product.category}</p>
              <p className="listproduct-quantity">{product.quantity}</p>
              <img
                onClick={() => {
                  removeProduct(product.id);
                }}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt="Xóa"
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
