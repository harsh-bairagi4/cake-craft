import React, { useEffect } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const navigate = useNavigate();
  
   useEffect(()=>{
      if(!localStorage.getItem("token")){
        navigate("/")
      }
    }, []);
  return (
    <section className="order-page">
      <h2>📦 Place Your Order</h2>

      <div className="order-container">
        {/* LEFT: DELIVERY DETAILS */}
        <div className="order-form">
          <h3>Delivery Details</h3>

          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Mobile Number" />
          <input type="email" placeholder="Email Address" />

          <input type="text" placeholder="Street Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Pincode" />

          <textarea placeholder="Delivery Instructions (optional)" />
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Total</span>
            <span>₹1448</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹50</span>
          </div>

          <div className="summary-row total">
            <span>Total Payable</span>
            <span>₹1498</span>
          </div>

          <button className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
