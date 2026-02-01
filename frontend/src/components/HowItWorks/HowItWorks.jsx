import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    icon: "🎯",
    title: "Choose Your Preferences",
    desc: "Select flavors, layers, frosting and style. Tell us what you imagine.",
  },
  {
    icon: "🤖",
    title: "AI Designs Your Cake",
    desc: "Our AI generates a unique cake design crafted only from your choices.",
  },
  {
    icon: "🍰",
    title: "We Bake It Fresh",
    desc: "Our bakers recreate your design with real ingredients and premium quality.",
  },
  {
    icon: "🎉",
    title: "Celebrate & Own It",
    desc: "Your cake is saved with your name. A design that becomes truly yours.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">
        From idea to celebration — your cake journey in four simple steps.
      </p>

      <div className="how-grid">
        {steps.map((step, index) => (
          <div className="how-card" key={index}>
            <div className="how-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
