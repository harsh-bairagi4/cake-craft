import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        
        {/* LEFT CONTENT */}
        <div className="hero-text">
          <span className="hero-badge">🍰 AI Powered Cake Studio</span>

          <h1>
            Design Your <br />
            <span>Dream Cake</span>
          </h1>

          <p>
            Create fully customized cakes using AI — choose flavors, layers,
            toppings, and get your personalized cake delivered fresh to your
            doorstep.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Build Your Cake</button>
            <button className="secondary-btn">View Menu</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img src="/cakepic.jpg" alt="Custom Cake" />
        </div>

      </div>
    </section>
  );
};

export default Header;
