import React, { useContext, useEffect } from "react";
import "./MyOrders.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const {token} = useContext(Context);
  const navigate = useNavigate();
  useEffect(()=>{
    // if(!localStorage.getItem("token")){
    //   navigate("/")
    // }
  }, []);
  return (
    <section className="orders-page">
      <h2>📦 My Orders</h2>

      <div className="orders-container">
        
        {/* ORDER CARD */}
        <div className="order-card">
          <div className="order-header">
            <h4>Chocolate Truffle Cake</h4>
            <span className="order-status delivered">Delivered</span>
          </div>

          <div className="order-body">
            <p>1 Kg • Eggless • 2 Layers</p>
            <p>Order ID: #CC10231</p>
          </div>

          <div className="order-footer">
            <span className="order-price">₹899</span>
            <button className="order-btn">View Details</button>
          </div>
        </div>

        {/* ORDER CARD */}
        <div className="order-card">
          <div className="order-header">
            <h4>Red Velvet Cake</h4>
            <span className="order-status processing">Processing</span>
          </div>

          <div className="order-body">
            <p>0.5 Kg • With Egg</p>
            <p>Order ID: #CC10245</p>
          </div>

          <div className="order-footer">
            <span className="order-price">₹549</span>
            <button className="order-btn">View Details</button>
          </div>
        </div>

        {/* ORDER CARD */}
        <div className="order-card">
          <div className="order-header">
            <h4>Custom AI Cake</h4>
            <span className="order-status pending">Pending</span>
          </div>

          <div className="order-body">
            <p>Custom Design • 1 Kg</p>
            <p>Order ID: #CC10258</p>
          </div>

          <div className="order-footer">
            <span className="order-price">₹1199</span>
            <button className="order-btn">View Details</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MyOrders;
