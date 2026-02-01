import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h3>🍰 AI Cake Studio</h3>
          <p>
            Design unique cakes using AI and turn celebrations
            into memorable moments.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>Create a Cake</li>
            <li>Cake Collection</li>
            <li>Pricing</li>
            <li>How It Works</li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AI Cake Studio. All rights reserved.
        </p>
        <p className="footer-tagline">
          Every cake has a creator.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
