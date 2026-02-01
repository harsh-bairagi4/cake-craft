import React, { useEffect, useState, useContext } from "react";
import "./Header.css";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Header = ({ setShowLogin }) => {
  const slides = [
    {
      badge: "🍫 AI Cake Studio",
      title: ["Create Your", "Own Cake"],
      text: "Start with your idea. We turn it into a cake design using AI.",
    },
    {
      badge: "🎨 One of a Kind",
      title: ["Not From a", "Catalog"],
      text: "Every cake begins as a fresh design based on your choices.",
    },
    {
      badge: "🧾 Your Signature",
      title: ["Your Name", "Stays With It"],
      text: "Once ordered, your cake appears in our collection with your name.",
    },
    {
      badge: "✨ Be the Creator",
      title: ["You're Not Just", "Ordering"],
      text: "Anyone can buy a cake. Very few can say they designed one.",
    },
  ];

  const { token } = useContext(Context);
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const showLogin = () => {
    if (!token) setShowLogin(true);
    else navigate("/generate");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-glow" />

      <div className="hero-container center">
        <div className="hero-text">
          <span className="hero-badge">
            {slides[current].badge}
          </span>

          <h1 className="hero-title">
            {slides[current].title[0]} <br />
            <span>{slides[current].title[1]}</span>
          </h1>

          <p className="hero-subtext">
            {slides[current].text}
          </p>

          <div className="hero-actions">
            <button className="primary-btn" onClick={showLogin}>
              Start Designing
            </button>
            <button className="secondary-btn">
              Explore Creations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
