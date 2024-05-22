import React, { useEffect, useState } from "react";
import "./ListReceipt.css"; // Tạo file CSS cho giao diện admin nếu cần thiết

const ListReceipt = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4010/orders");
      if (!response.ok) {
        throw new Error("Mạng phản hồi không tốt");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi khi lấy đơn hàng:", error);
      // Xử lý thông báo lỗi nếu cần thiết
    }
  };

  useEffect(() => {
    fetchOrders(); // Gọi hàm fetchOrders để lấy danh sách đơn hàng khi component được render
  }, []);

  const removeOrder = async (orderId) => {
    try {
      const response = await fetch("http://localhost:4010/removeorder", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }), // Đảm bảo gửi đúng trường orderId
      });
      if (!response.ok) {
        throw new Error("Lỗi khi xóa đơn hàng");
      }
      await fetchOrders(); // Cập nhật lại danh sách đơn hàng sau khi xóa thành công
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="list-receipt">
      <h1>Đơn hàng</h1>
      <div className="listreceipt-format-main">
        <p>ID Đơn hàng</p>
        <p>ID Khách hàng</p>
        <p>Sản phẩm</p>
        <p>Tổng giá</p>
        <p>Số điện thoại</p>
        <p>Địa chỉ</p>
        <p>Thao tác</p>
      </div>
      <div className="listreceipt-allreceipts">
        <hr />
        {orders.map((order) => (
          <React.Fragment key={order._id}>
            <div className="listreceipt-format-main listreceipt-format">
              <p>{order._id}</p>
              <p>{order.userId}</p>
              <p>
                {order.items.map((item, index) => (
                  <li key={index}>
                    ID Sản phẩm: {item.productId}, Số lượng: {item.quantity}
                  </li>
                ))}
              </p>
              <p>${calculateTotalPrice(order.items)}</p>
              <p>{order.phoneNumber}</p>
              <p>{order.address}</p>
              <button onClick={() => removeOrder(order._id)}>Xóa</button>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListReceipt;
