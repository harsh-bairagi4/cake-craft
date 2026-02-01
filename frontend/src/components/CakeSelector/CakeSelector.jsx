import React, { useContext, useEffect, useState } from "react";
import "./CakeSelector.css";
import { Context } from "../../context/Context";

const CakeSelector = ({ cakeData, setCakeData }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCakeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToppingChange = (e) => {
    const { value, checked } = e.target;

    setCakeData((prev) => {
      if (checked) {
        return {
          ...prev,
          toppings: [...prev.toppings, value],
        };
      } else {
        return {
          ...prev,
          toppings: prev.toppings.filter((t) => t !== value),
        };
      }
    });
  };

  return (
    <div>
      <h3>🍰 Build Your Cake</h3>
      {/* Flavor */}
      <select name="flavor" value={cakeData.flavor} onChange={handleChange}>
        <option value="">Select Cake Flavor</option>
        <option value="chocolate">Chocolate</option>
        <option value="vanilla">Vanilla</option>
        <option value="red-velvet">Red Velvet</option>
        <option value="butterscotch">Butterscotch</option>
        <option value="strawberry">Strawberry</option>
      </select>

      {/* Size */}
      <select name="size" value={cakeData.size} onChange={handleChange}>
        <option value="">Select Cake Size</option>
        <option value="0.5kg">0.5 Kg</option>
        <option value="1kg">1 Kg</option>
        <option value="2kg">2 Kg</option>
        <option value="3kg">3 Kg</option>
      </select>

      {/* Layers */}
      <select name="layers" value={cakeData.layers} onChange={handleChange}>
        <option value="">Select Layers</option>
        <option value="1">Single Layer</option>
        <option value="2">Double Layer</option>
        <option value="3">Triple Layer</option>
      </select>

      {/* Shape */}
      <select name="shape" value={cakeData.shape} onChange={handleChange}>
        <option value="">Select Cake Shape</option>
        <option value="round">Round</option>
        <option value="square">Square</option>
        <option value="heart">Heart</option>
        <option value="custom">Custom Shape</option>
      </select>

      {/* Frosting */}
      <select name="frosting" value={cakeData.frosting} onChange={handleChange}>
        <option value="">Select Frosting</option>
        <option value="buttercream">Buttercream</option>
        <option value="whipped-cream">Whipped Cream</option>
        <option value="cream-cheese">Cream Cheese</option>
        <option value="chocolate-ganache">Chocolate Ganache</option>
      </select>

      {/* Egg Type */}
      <select name="eggType" value={cakeData.eggType} onChange={handleChange}>
        <option value="">Egg Preference</option>
        <option value="eggless">Eggless</option>
        <option value="with-egg">With Egg</option>
      </select>

      {/* Sweetness */}
      <select
        name="sweetness"
        value={cakeData.sweetness}
        onChange={handleChange}
      >
        <option value="">Sweetness Level</option>
        <option value="low">Less Sweet</option>
        <option value="medium">Medium</option>
        <option value="high">Extra Sweet</option>
      </select>

      {/* Toppings */}
      <div className="toppings">
        <p>Select Toppings</p>

        <label>
          <input
            type="checkbox"
            value="choco-chips"
            checked={cakeData.toppings.includes("choco-chips")}
            onChange={handleToppingChange}
          />
          Choco Chips
        </label>

        <label>
          <input
            type="checkbox"
            value="sprinkles"
            checked={cakeData.toppings.includes("sprinkles")}
            onChange={handleToppingChange}
          />
          Sprinkles
        </label>

        <label>
          <input
            type="checkbox"
            value="nuts"
            checked={cakeData.toppings.includes("nuts")}
            onChange={handleToppingChange}
          />
          Dry Fruits / Nuts
        </label>

        <label>
          <input
            type="checkbox"
            value="strawberries"
            checked={cakeData.toppings.includes("strawberries")}
            onChange={handleToppingChange}
          />
          Strawberries
        </label>

        <label>
          <input
            type="checkbox"
            value="cherries"
            checked={cakeData.toppings.includes("cherries")}
            onChange={handleToppingChange}
          />
          Cherries
        </label>
      </div>
    </div>
  );
};


export default CakeSelector;
