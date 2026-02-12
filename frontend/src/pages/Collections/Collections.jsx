import React, { useContext, useEffect } from "react";
import "./Collections.css";
import { Context } from "../../context/Context";
import { toast } from "sonner";

const Collections = ({setShowLogin}) => {
  const {
    token,
    cakeList,
    cartItems,
    fetchCakeList,
    loadCartData,
    addToCart,
    deleteFromCart,
    capitalize,
    navigate,
  } = useContext(Context);

  /* ================= LOGIN GUARD ================= */
  useEffect(() => {
    loadCartData(token);
    console.log("Hi");
  }, []);

  return (
    <section className="collection-page">
      <div className="collection-header">
        <h2>✨ Community Creations</h2>
        <p>Explore cakes crafted by our creative users</p>
      </div>

      <div className="collection-grid">
        {cakeList.map((cake) => {
          const inCart = cartItems[cake._id];

          return (
            <div key={cake._id} className="collection-card">
              <div className="collection-image">
                <img src={cake.image} alt={cake.name} />

                <button
                  className={`collection-action ${inCart ? "remove" : ""}`}
                  onClick={() => {
                    if(token){
if (inCart) {
                      deleteFromCart(cake._id);
                      toast("Removed from cart ❌");
                    } else {
                      addToCart(cake._id);
                      toast("Added to cart 🍰");
                    }
                    }
                    else{
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
                  <span className="collection-price">₹{cake.price}</span>
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
