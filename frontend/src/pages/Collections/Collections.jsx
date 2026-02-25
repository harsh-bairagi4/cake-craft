import React, { useContext, useState, useMemo } from "react";
import "./Collections.css";
import { Context } from "../../context/Context";
import { toast } from "sonner";

const Collections = () => {
  const {
    token,
    setShowLogin,
    cartItems,
    addToCart,
    deleteFromCart,
    capitalize,
    loading,
    copyCakeList,
  } = useContext(Context);

  const [selectedFlavor, setSelectedFlavor] = useState("all");
  const [selectedEggType, setSelectedEggType] = useState("all");
  const [selectedSweetness, setSelectedSweetness] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCakes = useMemo(() => {
    let cakes = [...copyCakeList];

    if (selectedFlavor != "all") {
      cakes = cakes.filter((cake) => cake.description?.flavor === selectedFlavor);
    }

    if (selectedEggType != "all") {
      cakes = cakes.filter((cake) => cake.description?.eggType === selectedEggType);
    }

    if (selectedSweetness != "all") {
      cakes = cakes.filter((cake) => cake.description?.sweetness === selectedSweetness);
    }

    if (sortBy === "low") {
      cakes.sort((a, b) => a.price - b.price);
    }
    else if (sortBy === "high") {
      cakes.sort((a, b) => b.price - a.price);
    }

    return cakes;
  }, [copyCakeList, selectedFlavor, selectedEggType, selectedSweetness, sortBy]);
  

  return (
    <section className="collection-page">
      <div className="collection-header">
        <div className="header-left">
          <h2>✨ Community Creations</h2>
          <p>Explore cakes crafted by our creative users</p>
        </div>


        <div className="header-right">
          <select onChange={(e) => setSelectedFlavor(e.target.value)}>
            <option value="all">All Flavors</option>
            <option value="chocolate">Chocolate</option>
            <option value="vanilla">Vanilla</option>
            <option value="red-velvet">Red Velvet</option>
            <option value="butterscotch">Butterscotch</option>
            <option value="strawberry">Strawberry</option>
            <option value="mango">Mango</option>
            <option value="black-forest">Black Forest</option>
          </select>

          <select onChange={(e) => setSelectedEggType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="with-egg">With Egg</option>
            <option value="eggless">Eggless</option>
          </select>

          <select onChange={(e) => setSelectedSweetness(e.target.value)}>
            <option value="all">All Sweetness</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
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
          : filteredCakes.map((cake) => {
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
                    <span>Sweetness- {capitalize(cake.description?.sweetness)}</span>
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