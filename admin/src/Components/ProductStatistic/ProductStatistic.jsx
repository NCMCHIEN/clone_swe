import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProductStatistic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch product data using fetch
    fetch("http://localhost:4010/allproducts")
      .then((response) => response.json())
      .then((products) => {
        // Transform data for the chart
        const chartData = products.map((product) => ({
          name: product.name,
          sold: product.sold,
        }));
        setData(chartData);
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  return (
    <div>
      <h2>Thống kê số lượng sản phẩm đã bán</h2>
      <BarChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sold" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ProductStatistic;
