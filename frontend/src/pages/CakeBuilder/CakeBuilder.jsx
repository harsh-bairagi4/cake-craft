import React, { useContext, useEffect, useState } from "react";
import Lottie from "lottie-react";
import cakeLoading from "../../assets/cakeLoading.json";
import "./CakeBuilder.css";
import CakeSelector from "../../components/CakeSelector/CakeSelector";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "sonner";

const CakeBuilder = () => {
  const { url, generateImage, labour, addToCart, capitalize, token, navigate, generatedCake, setGeneratedCake } =
    useContext(Context);

  const [cakeData, setCakeData] = useState({
    flavor: "",
    size: "",
    layers: "",
    frosting: "",
    shape: "",
    eggType: "",
    sweetness: "",
    toppings: [],
  });
  const [dbCakeData, setDbCakeData] = useState(cakeData);
  console.log("CakeData", cakeData);
  console.log("DbCakeData", dbCakeData);
  console.log("Generated CAKE: ", generatedCake);

  const [imageUrl, setImageUrl] = useState("/cakepic.jpg");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleZoom = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomStyle({
      display: "block",
      backgroundPosition: `${xPercent}% ${yPercent}%`,
    });
  };

  const isCakeDataValid = () =>
    cakeData.flavor &&
    cakeData.size &&
    cakeData.layers &&
    cakeData.shape &&
    cakeData.frosting &&
    cakeData.eggType &&
    cakeData.sweetness;

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

Ultra realistic food photography, no people, no hands.
`.trim();
  };

  const basePriceMap = { "0.5kg": 400, "1kg": 700, "2kg": 1300, "3kg": 1800 };
  const layerPriceMap = { 1: 0, 2: 100, 3: 200 };
  const frostingPriceMap = {
    "whipped-cream": 50,
    "chocolate-ganache": 80,
    buttercream: 100,
    fondant: 130,
    "cream-cheese": 150,
  };
  const eggPriceMap = { "with-egg": 100, eggless: 0 };

  const calculateCakePrice = () => {
    let price = 0;
    price += basePriceMap[dbCakeData.size] || 0;
    price += layerPriceMap[dbCakeData.layers] || 0;
    price += frostingPriceMap[dbCakeData.frosting] || 0;
    price += eggPriceMap[dbCakeData.eggType] || 0;
    price += dbCakeData.toppings.length * 50;
    price += labour;
    return price;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!token) return toast("Please signup first");
    if (!isCakeDataValid())
      return toast("Please select all required cake options 🍰");

    setIsGenerating(true);
    setDbCakeData(cakeData);
    try {
      const img = await generateImage(buildCakePrompt(cakeData));
      setImageUrl(img);
      setHasGenerated(true);
      setGeneratedCake({
        imageUrl: img,
        cakeData,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsGenerating(false);
      setCakeData({
        flavor: "",
        size: "",
        layers: "",
        frosting: "",
        shape: "",
        eggType: "",
        sweetness: "",
        toppings: [],
      });
    }
  };

  const handleGenerateAnother = () => {
    setHasGenerated(false);
    setImageUrl("/cakepic.jpg");
    setDbCakeData({
      flavor: "",
      size: "",
      layers: "",
      frosting: "",
      shape: "",
      eggType: "",
      sweetness: "",
      toppings: [],
    });
    setGeneratedCake(null);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const payload = {
        name: `${capitalize(dbCakeData.flavor)} Cake`,
        price: calculateCakePrice(),
        image: imageUrl,
        description: dbCakeData,
      };

      const response = await axios.post(url + "/api/cake/custom", payload, {
        headers: { token },
      });

      if (response.data.success) {
        const newCake = response.data.cake;
        await addToCart(newCake._id, newCake);
        toast.success("Cake added to cart successfully 🍰");
        setTimeout(() => navigate("/cart"), 100);
        setGeneratedCake(null);
      } else {
        toast(response.data.message || "Failed to add cake");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while adding cake");
    } finally {
      setIsAddingToCart(false);
      setDbCakeData({
        flavor: "",
        size: "",
        layers: "",
        frosting: "",
        shape: "",
        eggType: "",
        sweetness: "",
        toppings: [],
      });
    }
  };
  useEffect(() => {
  if (generatedCake) {
    setImageUrl(generatedCake.imageUrl);
    setDbCakeData(generatedCake.cakeData);
    setHasGenerated(true);
  }
}, [generatedCake]);

  return (
    <section className="cake-builder-page">
      <div className="cake-builder-left">
        <CakeSelector
          cakeData={cakeData}
          setCakeData={setCakeData}
          disabled={isGenerating}
        />
      </div>

      <div className="cake-builder-right">
        <div className="preview-box">
          <h3>Your Cake Preview</h3>

          <div className="preview-image">
            {isGenerating ? (
              <div className="global-loader">
                <Lottie
                  animationData={cakeLoading}
                  loop
                />
                <div className="image-loader">Generating...</div>
              </div>
            ) : hasGenerated ? (
              <div
                className="zoom-container"
                onMouseMove={handleZoom}
                onMouseLeave={() => setZoomStyle({})}
              >
                <img src={imageUrl} alt="Cake Preview" />

                <div
                  className="zoom-lens"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    ...zoomStyle,
                  }}
                />
              </div>
            ) : (
              <img src={imageUrl} alt="Cake Preview" />
            )}
          </div>

          <div className="preview-actions">
            {!hasGenerated ? (
              <button
                className="secondary-btn"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating" : "Generate Cake"}
              </button>
            ) : (
              <button className="secondary-btn" onClick={handleGenerateAnother}>
                Generate Another Cake
              </button>
            )}
          </div>

          {hasGenerated && !isGenerating && (
            <div className="cake-info-card">
              <h4>🍰 Cake Details</h4>
              <h3>{capitalize(dbCakeData.flavor) + " Cake"}</h3>
              <ul>
                <li>
                  <strong>Flavor:</strong> {capitalize(dbCakeData.flavor)}
                </li>
                <li>
                  <strong>Size:</strong> {dbCakeData.size}
                </li>
                <li>
                  <strong>Layers:</strong> {dbCakeData.layers}
                </li>
                <li>
                  <strong>Shape:</strong> {capitalize(dbCakeData.shape)}
                </li>
                <li>
                  <strong>Frosting:</strong>{" "}
                  {capitalize(dbCakeData.frosting.replace("-", " "))}
                </li>
                <li>
                  <strong>Egg Type:</strong>{" "}
                  {capitalize(dbCakeData.eggType.replace("-", " "))}
                </li>
                {dbCakeData.toppings.length > 0 && (
                  <li>
                    <strong>Toppings:</strong>{" "}
                    {dbCakeData.toppings.map(capitalize).join(", ")}
                  </li>
                )}
              </ul>

              <div className="cake-price">
                Total Price: <span>₹{calculateCakePrice()}</span>
              </div>

              <button
                className="primary-btn"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          )}
        </div>
      </div>
      {isGenerating && (
  <div className="global-overlay">
  </div>
)}
    </section>
  );
};

export default CakeBuilder;
