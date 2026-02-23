import React, { useContext, useEffect } from "react";
import "./MyOrders.css";
import { Context } from "../../context/Context";

const MyOrders = () => {
  const { token, orderData, loadOrderData, orderDataLoading } = useContext(Context);

  useEffect(() => {
   
    loadOrderData();
  }, [token]);

  return (
    <section className="orders-page">
      <h2>📦 My Orders</h2>

      <div className="orders-container">

        {orderDataLoading &&
          Array(2)
            .fill(0)
            .map((_, i) => (
              <div className="order-card skeleton-card" key={i}>
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-status"></div>
                <div className="skeleton skeleton-item"></div>
                <div className="skeleton skeleton-item"></div>
                <div className="skeleton skeleton-address"></div>
                <div className="skeleton skeleton-footer"></div>
              </div>
            ))}

        {!orderDataLoading && orderData.length === 0 && (
          <p className="no-orders">No orders yet 🍰 Start building your cake!</p>
        )}

       
        {!orderDataLoading &&
          orderData.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-header">
                <div>
                  <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`order-status ${order.status
                    ?.toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <div className="order-item-left">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="order-item-image"
                      />
                      <div>
                        <h5>{item.name}</h5>
                        <p>
                          {item.description?.size} •{" "}
                          {item.description?.layers} Layers •{" "}
                          {item.description?.eggType}
                        </p>
                        <p>Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="order-item-price">₹{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="order-address">
                <h5>Delivery Address</h5>
                <p>
                  {order.address.fullName}, {order.address.street},{" "}
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.pincode}
                </p>
                <p>📞 {order.address.phone}</p>
              </div>

              <div className="order-footer">
                <div className="payment-info">
                  <p>
                    Payment:{" "}
                    <strong>
                      {order.payment ? "Paid ✅" : "Pending 💰"}
                    </strong>
                  </p>
                  <p>
                    Method: <strong>{order.paymentMethod}</strong>
                  </p>
                </div>
                <div className="order-total">Total: ₹{order.amount}</div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default MyOrders;