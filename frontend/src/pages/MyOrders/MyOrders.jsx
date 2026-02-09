import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const MyOrders = () => {
  const { token, url } = useContext(Context);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              date: order.date,
              orderId: order._id,
            });
          });
        });

        setOrderData(allOrders.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <section className="orders-page">
      <h2>📦 My Orders</h2>

      <div className="orders-container">
        {orderData.length === 0 && (
          <p style={{ color: "var(--text-secondary)" }}>
            No orders found 🍰
          </p>
        )}

        {orderData.map((order, index) => (
          <div className="order-card" key={index}>
            <div className="order-header">
              <h4>{order.name}</h4>
              <span
                className={`order-status ${
                  order.status?.toLowerCase() || "pending"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-body">
              <p>
                {order.description?.size} •{" "}
                {order.description?.eggType === "eggless"
                  ? "Eggless"
                  : "With Egg"}{" "}
                • {order.description?.layers} Layers
              </p>
              <p>Order ID: #{order.orderId.slice(-6)}</p>
            </div>

            <div className="order-footer">
              <span className="order-price">₹{order.price}</span>
              <button className="order-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
