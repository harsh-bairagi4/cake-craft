import React, { useContext } from "react";
import "./Pricing.css";
import CardSwap, { Card } from "../CardSwap/CardSwap";
import { motion } from "framer-motion";
import { Context } from "../../context/Context";

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
      "Limited credits",
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
  },
  {
    title: "Premium",
    price: "₹1299",
    subtitle: "For parties & gifting",
    features: [
      "Everything in Creator",
      "Luxury decoration",
      "Custom message on cake",
      "Premium packaging",
      "Best for gifting",
    ],
  },
];

const Pricing = () => {
  const {navigate} = useContext(Context);
  return (
    <section className="pricing">
      <div className="pricing-container">

        <div className="showmobile">
          <motion.h2 className="pricing-title" initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.8, 1, 0.96, 1],
          }}>Simple & Transparent Pricing</motion.h2>
        </div>

        {/* LEFT CONTENT */}
        <motion.div
          className="pricing-info"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.8, 1, 0.96, 1],
          }}
        >
          <h2 className="pricing-title">Simple & Transparent Pricing</h2>

          <p className="pricing-desc">
            Create your cake with confidence. No hidden charges, no confusion —
            just clear plans designed for every celebration.
          </p>

          <p className="pricing-note">
            Start free. Upgrade anytime when you’re ready to bake something
            bigger.
          </p>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          className="pricing-cards-wrapper"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.8, 1, 0.96, 1],
          }}
        >
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={4500}
            pauseOnHover={false}
          >
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="cursor" onClick={()=> navigate("/subscription")}>
                <div
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
              </Card>
            ))}
          </CardSwap>
        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
