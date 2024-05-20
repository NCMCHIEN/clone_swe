import React, { useEffect, useState } from "react";
import "./ListReceipt.css"; // Tạo file CSS cho giao diện admin nếu cần thiết

const ListReceipt = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(); // Gọi hàm fetchOrders để lấy danh sách đơn hàng khi component được render
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4005/orders");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Xử lý thông báo lỗi nếu cần thiết
    }
  };

  const removeOrder = async (id) => {
    try {
      const response = await fetch("http://localhost:4005/removeorder", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
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

  return (
    <div className="admin-orders">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Items</th>
            <th>Total Price</th>
            {/* <th>Date</th> */}
            <th>Phone Number</th>
            <th>Address</th>
            <th>Actions</th> {/* Thêm cột Actions */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      Product ID: {item.productId}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${calculateTotalPrice(order.items)}</td>
              {/* <td>{moment(order.date).format("YYYY-MM-DD HH:mm:ss")}</td> */}
              <td>{order.phoneNumber}</td>
              <td>{order.address}</td>
              <td>
                <button onClick={() => removeOrder(order._id)}>Remove</button>
              </td>{" "}
              {/* Thêm nút Remove */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default ListReceipt;
