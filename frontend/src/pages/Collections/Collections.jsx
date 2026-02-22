import React, { useContext, useEffect, useState } from "react";
import "./Collections.css";
import { Context } from "../../context/Context";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Collections = () => {
  const {
    token,
    setShowLogin,
    cakeList,
    cartItems,
    loadCartData,
    addToCart,
    deleteFromCart,
    capitalize,
    loading
  } = useContext(Context);


  return (
    <section className="collection-page">
      <div className="collection-header">
        <h2>✨ Community Creations</h2>
        <p>Explore cakes crafted by our creative users</p>
      </div>

      <div className="collection-grid">
      {loading
  ? Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="collection-card">
          <div className="skeleton-image"></div>

          <div className="collection-info">
            <div className="skeleton-title"></div>

            <div className="skeleton-tags-row">
              <span className="skeleton-chip"></span>
              <span className="skeleton-chip"></span>
              <span className="skeleton-chip"></span>
            </div>

            <div className="skeleton-tags-row">
              <span className="skeleton-chip small"></span>
              <span className="skeleton-chip small"></span>
            </div>

            <div className="skeleton-price"></div>
          </div>
        </div>
      ))
  :  cakeList.map((cake) => {
      const inCart = cartItems[cake._id];

      return (
        <div key={cake._id} className="collection-card">
          <div className="collection-image">
            <img src={cake.image} alt={cake.name} />

            <button
              className={`collection-action ${inCart ? "remove" : ""}`}
              onClick={() => {
                if (token) {
                  if (inCart) {
                    deleteFromCart(cake._id);
                    toast("Removed from cart ❌");
                  } else {
                    addToCart(cake._id);
                    toast("Added to cart 🍰");
                  }
                } else {
                  setShowLogin(true);
                }
              }}
            >
              {inCart ? "×" : "+"}
            </button>
          </div>

          <div className="collection-info">
            <h4>{cake.name}</h4>

            <div className="collection-tags">
              <span>{capitalize(cake.description?.flavor)}</span>
              <span>{cake.description?.size}</span>
              <span>{cake.description?.layers} Layers</span>
              <span>{capitalize(cake.description?.frosting)}</span>
              <span>{capitalize(cake.description?.eggType)}</span>
              <span>
                Sweetness- {capitalize(cake.description?.sweetness)}
              </span>
            </div>

            <div className="collection-footer">
              <span className="collection-price">
                ₹{cake.price}
              </span>
            </div>
          </div>
        </div>
      );
    })}

      </div>
    </section>
  );
};

export default Collections;
