import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Cart = () => {
  const navigate = useNavigate();
  const { cakeList, cartItems, getTotalCartAmount,fetchCakeList ,capitalize, loadCartData} = useContext(Context);
  useEffect(()=>{
    fetchCakeList();
    loadCartData(localStorage.getItem("token"));
    console.log(cakeList);
    console.log(cartItems);
  }, []);

  return (
    <section className="cart-studio">
      <div className="cart-header">
        <h2>🛒 Your Cake Cart</h2>
        <p>Review your handcrafted cake creations</p>
      </div>

      <div className="cart-studio-layout">
        {/* LEFT: CAKE CARDS */}
        <div className="cart-cakes">
          {cakeList.map((cake) => {
            const qty = cartItems[cake._id] || 0;
            if (qty > 0) {
              return (
                <div key={cake._id} className="cake-card">
                  <div className="cake-image">
                    <img src={cake.image} alt={cake.name} />
                  </div>

                  <div className="cake-info">
                    <h4>{cake.name}</h4>

                    <div className="cake-tags">
                      <span>{capitalize(cake.description.flavor)}</span>
                      <span>{cake.description.size}</span>
                      <span>{capitalize(cake.description.frosting)}</span>
                      <span>{cake.description.layers} Layers</span>
                      <span>{capitalize(cake.description.shape)}</span>
                      <span>{capitalize(cake.description.eggType)}</span>
                      <span>Sweetness- {capitalize(cake.description.sweetness)}</span>
                    </div>

                    <div className="cake-footer">
                      <span className="cake-price">₹{cake.price}</span>
                      <span className="cake-qty">
                        Qty: {cartItems[cake._id]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            else{
              <div>Your Harsh</div>
            }
            return null;
          })}
        </div>

        {/* RIGHT: CHECKOUT PANEL */}
        <div className="checkout-panel">
          <h3>Order Summary</h3>

          <div className="bill-line">
            <span>Subtotal</span>
            <span>₹—{getTotalCartAmount()}</span>
          </div>

          <div className="bill-line">
            <span>Delivery</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : 50}</span>
          </div>

          <div className="bill-line total">
            <span>Total</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/place-order")}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
