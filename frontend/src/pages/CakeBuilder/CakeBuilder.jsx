import React, { useContext, useEffect, useState } from "react";
import "./CakeBuilder.css";
import CakeSelector from "../../components/CakeSelector/CakeSelector";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const CakeBuilder = () => {
  const {url, generateImage, labour, addToCart,capitalize, token, navigate} = useContext(Context);

  /* =======================
     STATE
  ======================= */
  const [cakeData, setCakeData] = useState({
    flavor: "",
    size: "",
    layers: "",
    frosting: "",
    shape: "",
    eggType: "",
    sweetness: "",
    toppings: [],
    message: "",
  });

  const [imageUrl, setImageUrl] = useState("/cakepic.jpg");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  

  

  /* =======================
     VALIDATION
  ======================= */
  const isCakeDataValid = () => {
    return (
      cakeData.flavor &&
      cakeData.size &&
      cakeData.layers &&
      cakeData.shape &&
      cakeData.frosting &&
      cakeData.eggType &&
      cakeData.sweetness
    );
  };

  /* =======================
     PROMPT BUILDER
  ======================= */
  const buildCakePrompt = (cakeData) => {
    const {
      flavor,
      size,
      layers,
      frosting,
      shape,
      eggType,
      sweetness,
      toppings,
      message,
    } = cakeData;

    return `
A high-quality, ultra realistic bakery-style cake.

Cake details:
- Flavor: ${flavor}
- Size: ${size}
- Layers: ${layers}
- Shape: ${shape} shaped
- Frosting: ${frosting}
- Egg preference: ${eggType}
- Sweetness: ${sweetness || "medium"}

Toppings:
${toppings.length ? toppings.join(", ") : "No extra toppings"}

Design:
- Professional bakery finish
- Smooth frosting
- Elegant look
- Studio lighting
- Premium cake stand
- Plain background

${message ? `Text on cake: "${message}"` : ""}

Ultra realistic food photography, no people, no hands.
`.trim();
  };

  /* =======================
     PRICE LOGIC
  ======================= */
  const basePriceMap = {
    "0.5kg": 400,
    "1kg": 700,
    "2kg": 1300,
    "3kg": 1800,
  };

  const layerPriceMap = { "1": 0, "2": 150, "3": 300 };
  const frostingPriceMap = {
    "buttercream": 50,
    "whipped-cream": 100,
    "fondant": 120,
    "cream-cheese": 150,
    "chocolate-ganache": 200,
  };
  const shapePriceMap = {
    "round": 50,
    "square": 100,
    "heart": 150,
    "custom": 300,
  };
  const eggPriceMap = { "with-egg": 100, "eggless": 0 };

  const calculateCakePrice = () => {
    let price = 0;
    price += basePriceMap[cakeData.size] || 0;
    price += layerPriceMap[cakeData.layers] || 0;
    price += frostingPriceMap[cakeData.frosting] || 0;
    price += shapePriceMap[cakeData.shape] || 0;
    price += eggPriceMap[cakeData.eggType] || 0;
    price += cakeData.toppings.length * 50;
    price += labour;
    return price;
  };

  /* =======================
     ACTIONS
  ======================= */
  const handleGenerate = async (e) => {
    e.preventDefault();
    if(!token){
      toast("Please signup first");
      return;
    }
    if (!isCakeDataValid()) {
      toast("Please select all required cake options 🍰");
      return;
    }
    

    setIsGenerating(true);
    try {
      const img = await generateImage(buildCakePrompt(cakeData));
      setImageUrl(img);
      setHasGenerated(true);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAnother = () => {
    if(!token){
      toast("Please signup first");
      return;
    }
    setHasGenerated(false);
    setImageUrl("/cakepic.jpg");
  };
 const handleAddToCart = async () => {
   if(!token){
      toast("Please signup first");
      return;
    }
  try {
    const payload = {
      name: `${capitalize(cakeData.flavor)} Cake`,
      price: calculateCakePrice(),
      image: imageUrl,
      description: cakeData,
    };

    const response = await axios.post(url + "/api/cake/custom",
      payload,
       {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    if (response.data.success) {
      toast("Cake added to cart 🍰");
      addToCart(response.data.cake._id);
      navigate("/cart");
    } else {
      toast(response.data.message || "Failed to add cake");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while adding cake");
  }
};

  
  /* =======================
     JSX
  ======================= */
  return (
    <section className="cake-builder-page">
      {/* LEFT */}
      <div className="cake-builder-left">
        <CakeSelector cakeData={cakeData} setCakeData={setCakeData} />
      </div>

      {/* RIGHT */}
      <div className="cake-builder-right">
        <div className="preview-box">
          <h3>Your Cake Preview</h3>

          <div className="preview-image">
            {isGenerating ? (
              <div className="image-loader">Generating...</div>
            ) : (
              <img src={imageUrl} alt="Cake Preview" />
            )}
          </div>

          {/* BUTTONS */}
          <div className="preview-actions">
            {!hasGenerated ? (
              <button
                className="secondary-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Cake"}
              </button>
            ) : (
              <>
                <button
                  className="secondary-btn"
                  onClick={handleGenerateAnother}
                >
                  Generate Another Cake
                </button>
               
              </>
            )}
          </div>

          {/* DETAILS CARD */}
          {hasGenerated && !isGenerating && (
            <div className="cake-info-card">
              <h4>🍰 Cake Details</h4>
              <h3>{capitalize(cakeData.flavor) + " Cake"}</h3>
              <ul>
                <li><strong>Flavor:</strong> {capitalize(cakeData.flavor)}</li>
                <li><strong>Size:</strong> {cakeData.size}</li>
                <li><strong>Layers:</strong> {cakeData.layers}</li>
                <li><strong>Shape:</strong> {capitalize(cakeData.shape)}</li>
                <li>
                  <strong>Frosting:</strong>{" "}
                  {capitalize(cakeData.frosting.replace("-", " "))}
                </li>
                <li>
                  <strong>Egg Type:</strong>{" "}
                  {capitalize(cakeData.eggType.replace("-", " "))}
                </li>

                {cakeData.toppings.length > 0 && (
                  <li>
                    <strong>Toppings:</strong>{" "}
                    {cakeData.toppings.map(capitalize).join(", ")}
                  </li>
                )}
              </ul>

              <div className="cake-price">
                Total Price:
                <span> ₹{calculateCakePrice()}</span>
              </div>
               <button className="primary-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CakeBuilder;
