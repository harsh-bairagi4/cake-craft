import React from "react";
import "./Pricing.css";

const pricingPlans = [
  {
    title: "Basic",
    price: "₹0",
    subtitle: "Perfect for small celebrations",
    features: [
      "AI-generated cake design",
      "Standard cake size",
      "Single delivery",
      "Creator name saved",
      "Limited credits"
    ],
  },
  {
    title: "Creator",
    price: "₹799",
    subtitle: "Most popular choice",
    highlight: true,
    features: [
      "Everything in Basic",
      "Premium cake size",
      "Other categories to select",
      "Unlimited credits",
      "Free delivery",
    ],
  }
];

const Pricing = () => {
  return (
    <section className="pricing">
      <h2 className="pricing-title">
       Simple, Transparent Pricing
      </h2>

      <div className="pricing-cards">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${
              plan.highlight ? "highlight" : ""
            }`}
          >
            {plan.highlight && (
              <span className="popular-badge">Most Popular</span>
            )}

            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <p className="subtitle">{plan.subtitle}</p>

            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>✓ {feature}</li>
              ))}
            </ul>

            <button className="pricing-btn">
              Choose {plan.title}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
