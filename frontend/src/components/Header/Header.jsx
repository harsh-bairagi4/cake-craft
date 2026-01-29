import React, { useContext } from "react";

import "./Header.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Header = ({setShowLogin}) => {
  const {token} = useContext(Context);
  const navigate = useNavigate();

  const showLogin = () => {
    if(!token){
      setShowLogin(true);
    }
    else{
      navigate("/generate");
    }
  }
  return (
    <section className="hero">
      

      <div className="hero-container">
        <div className="hero-text">
          <span className="hero-badge">🍫 AI Powered Cake Studio</span>

          <h1>
            Design Your <br />
            <span>Dream Cake</span>
          </h1>

          <p>
            Craft premium custom cakes using AI — choose flavors, layers,
            toppings and get it delivered fresh.
          </p>

          <div className="hero-actions">
            <button className="primary-btn" 
            onClick={showLogin}>Build Your Cake</button>
            <button className="secondary-btn">View Menu</button>
          </div>
        </div>

        <div className="hero-image">
          <img src="/cakepic.jpg" alt="Custom Cake" />
        </div>
      </div>
    </section>
  );
};

export default Header;
