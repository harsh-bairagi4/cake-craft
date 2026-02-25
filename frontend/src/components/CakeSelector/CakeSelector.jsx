import React from "react";
import "./CakeSelector.css";

const CakeSelector = ({ cakeData, setCakeData, disabled }) => {

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

  const renderSelect = (name, value, children) => (
    <div className="select-wrapper">
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={value ? "has-value" : ""}
        disabled={disabled}
      >
        {children}
      </select>
    </div>
  );

  return (
    <div className="cake-selector">
      <h3>🍰 Build Your Cake</h3>

      {renderSelect("flavor", cakeData.flavor, <>
        <option value="" disabled className="placeholder">Select Cake Flavor</option>
        <option value="chocolate">Chocolate</option>
        <option value="vanilla">Vanilla</option>
        <option value="red-velvet">Red Velvet</option>
        <option value="butterscotch">Butterscotch</option>
        <option value="strawberry">Strawberry</option>
        <option value="mango">Mango</option>
        <option value="black-forest">Black Forest</option>
      </>)}

      {renderSelect("size", cakeData.size, <>
        <option value="" disabled className="placeholder">Select Cake Size</option>
        <option value="0.5kg">0.5 Kg</option>
        <option value="1kg">1 Kg</option>
        <option value="2kg">2 Kg</option>
        <option value="3kg">3 Kg</option>
      </>)}

      {renderSelect("layers", cakeData.layers, <>
        <option value="" disabled className="placeholder">Select Layers</option>
        <option value="1">Single Layer</option>
        <option value="2">Double Layer</option>
        <option value="3">Triple Layer</option>
      </>)}

      {renderSelect("shape", cakeData.shape, <>
        <option value="" disabled className="placeholder">Select Cake Shape</option>
        <option value="round">Round</option>
        <option value="square">Square</option>
        <option value="heart">Heart</option>
        <option value="custom">Custom Shape</option>
      </>)}

      {renderSelect("frosting", cakeData.frosting, <>
        <option value="" disabled className="placeholder">Select Frosting</option>
        <option value="whipped-cream">Whipped Cream</option>
        <option value="chocolate-ganache">Chocolate Ganache</option>
        <option value="buttercream">Buttercream</option>
        <option value="fondant">Fondant</option>
        <option value="cream-cheese">Cream Cheese</option>
      </>)}

      {renderSelect("eggType", cakeData.eggType, <>
        <option value="" disabled className="placeholder">Egg Preference</option>
        <option value="eggless">Eggless</option>
        <option value="with-egg">With Egg</option>
      </>)}

      {renderSelect("sweetness", cakeData.sweetness, <>
        <option value="" disabled className="placeholder">Sweetness Level</option>
        <option value="low">Less Sweet</option>
        <option value="medium">Medium</option>
        <option value="high">Extra Sweet</option>
      </>)}

      {/* Toppings */}
      <div className="toppings">
        <p>Select Toppings</p>

        {["choco-chips","sprinkles","nuts","strawberries","cherries","caramel drizzle", "chocolate drizzle"].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              value={item}
              checked={cakeData.toppings.includes(item)}
              onChange={handleToppingChange}
              disabled = {disabled}
            />
            {item.replace("-", " ")}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CakeSelector;
