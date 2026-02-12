import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "sonner";

const MyOrders = () => {
  const { token, url } = useContext(Context);
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
        setOrderData(response.data.orders);
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
          <p className="no-orders">
            No orders found 🍰
          </p>
        )}

        {orderData.map((order, index) => (
          <div className="order-card" key={index}>
            {/* HEADER */}
            <div className="order-header">
              <div>
                <h4>Order #{order._id.slice(-6)}</h4>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`order-status ${
                  order.status?.toLowerCase().replace(/\s/g, "") || "pending"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      {item.description?.size} •{" "}
                      {item.description?.layers} Layers •{" "}
                      {item.description?.eggType === "eggless"
                        ? "Eggless"
                        : "With Egg"}
                    </p>
                  </div>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="order-footer">
              <div className="payment-info">
                <p>
                  Payment:{" "}
                  <strong>
                    {order.payment ? "Paid" : "Cash on Delivery"}
                  </strong>
                </p>
                <p>
                  Method: <strong>{order.paymentMethod}</strong>
                </p>
              </div>

              <div className="order-total">
                Total: ₹{order.amount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyOrders;
