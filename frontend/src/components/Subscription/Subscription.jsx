import { useContext } from "react";
import "./Subscription.css";
import { Context } from "../../context/Context";
import { toast } from "sonner";

const Subscription = () => {
  const { navigate } = useContext(Context);

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

  const handleClick = (planTitle) => {
    if (planTitle === "Basic") {
      navigate("/generate");
    } else {
      toast.info(
        `🚧 ${planTitle} subscription features are currently under development.`,
      );
    }
  };

  return (
    <section className="pricing">
      <div className="container">
        <h2 className="pricing-title">Simple, Transparent Pricing</h2>

        <div className="pricing-cards">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
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

              <button
                onClick={() => handleClick(plan.title)}
                className="pricing-btn"
              >
                Choose {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
