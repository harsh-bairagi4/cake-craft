import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cakeList,
    cartItems,
    getTotalCartAmount,
    token,
    capitalize,
    loadCartData,
    addToCart,
    removeFromCart,
    deleteFromCart,
    cartDataLoading,
  } = useContext(Context);


  return (
    <section className="cart-studio">
      <div className="cart-header">
        <h2>🛒 Your Cake Cart</h2>
        <p>Review your handcrafted cake creations</p>
      </div>

      <div className="cart-studio-layout">

        {/* ================= LEFT SIDE ================= */}
        <div className="cart-cakes">

          {/* SKELETON LOADER */}
          {cartDataLoading ?  Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="cake-card skeleton-card">
                  <div className="skeleton skeleton-image"></div>

                  <div className="cake-info">
                    <div className="skeleton skeleton-title"></div>

                    <div className="skeleton skeleton-tags"></div>
                    <div className="skeleton skeleton-tags small"></div>

                    <div className="skeleton skeleton-footer"></div>
                  </div>
                </div>
              )) :   
            cakeList.map((cake) => {
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
                        <span>
                          Sweetness- {capitalize(cake.description.sweetness)}
                        </span>
                      </div>

                      <div className="cake-footer">
                        <span className="cake-price">₹{cake.price}</span>

                        <div className="qty-controls">
                          <button
                            className="qty-btn"
                            onClick={() => {
                              if (cartItems[cake._id] === 1) {
                                toast("Remove this cake from cart?", {
                                  action: {
                                    label: "Yes, Remove",
                                    onClick: () =>
                                      deleteFromCart(cake._id),
                                  },
                                });
                              } else {
                                removeFromCart(cake._id);
                              }
                            }}
                          >
                            {cartItems[cake._id] === 1 ? "×" : "−"}
                          </button>

                          <span className="qty-number">
                            {cartItems[cake._id]}
                          </span>

                          <button
                            className={`qty-btn ${
                              cartItems[cake._id] >= 8
                                ? "shake"
                                : ""
                            }`}
                            onClick={() => {
                              if (cartItems[cake._id] < 8) {
                                addToCart(cake._id);
                              } else {
                                toast(
                                  "Maximum 8 cakes allowed per item 🍰"
                                );
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })
            }
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="checkout-panel">
          {cartDataLoading ? (
            <>
              <div className="skeleton skeleton-summary-title"></div>
              <div className="skeleton skeleton-summary-line"></div>
              <div className="skeleton skeleton-summary-line"></div>
              <div className="skeleton skeleton-summary-total"></div>
              <div className="skeleton skeleton-summary-btn"></div>
            </>
          ) : (
            <>
              <h3>Order Summary</h3>

              <div className="bill-line">
                <span>Subtotal</span>
                <span>₹{getTotalCartAmount()}</span>
              </div>

              <div className="bill-line">
                <span>Delivery</span>
                <span>
                  ₹{getTotalCartAmount() === 0 ? 0 : 50}
                </span>
              </div>

              <div className="bill-line total">
                <span>Total</span>
                <span>
                  ₹
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 50}
                </span>
              </div>

              <button
                className="checkout-btn"
                disabled={getTotalCartAmount() === 0}
                onClick={() => navigate("/place-order")}
              >
                Proceed to Checkout →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;