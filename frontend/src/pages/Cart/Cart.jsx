import React, { useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  }, []);
  return (
    <section className="cart-page">
      <h2>🛒 Your Cart</h2>

      <div className="cart-container">
        {/* CART ITEMS */}
        <div className="cart-items">
          <div className="cart-item">
            <img src="/cakepic.jpg" alt="Cake" />
            <div className="item-details">
              <h4>Chocolate Truffle Cake</h4>
              <p>1 Kg • Eggless • 2 Layers</p>
            </div>
            <span className="item-price">₹899</span>
          </div>

          <div className="cart-item">
            <img src="/cakepic.jpg" alt="Cake" />
            <div className="item-details">
              <h4>Red Velvet Cake</h4>
              <p>0.5 Kg • With Egg</p>
            </div>
            <span className="item-price">₹549</span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹1448</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹50</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹1498</span>
          </div>

          <button onClick={()=> navigate("/place-order")} className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
