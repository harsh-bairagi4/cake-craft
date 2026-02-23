import { useEffect, useState, useContext } from "react";
import "./Header.css";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";

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


const Header = () => {
  const { token ,navigate, setShowLogin, hasAnimated, handleComplete} = useContext(Context);
 
  const [current, setCurrent] = useState(0);

  const showLogin = () => {
    if (!token) setShowLogin(true);
    else
       navigate("/generate");
  };

 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4300);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      className="hero"
      initial={!hasAnimated ? {
        opacity: 0,
        filter: "blur(2px)",
      }:false}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.1,
        ease: "easeOut",
      }}
      onAnimationComplete={handleComplete}
    >
      <div className="hero-glow" />
      

      <div className="hero-container center">
        <div className="hero-text">
          <span className="hero-badge">{slides[current].badge}</span>

          <motion.h1
            className="hero-title"
            initial={!hasAnimated ?{
              opacity: 0,
              scale: 0.96,
              filter: "blur(2px)",
            }: false}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.4, 
              duration: 0.9,
              ease: "easeOut",
            }}
          >
            {slides[current].title[0]} <br />
            <span>{slides[current].title[1]}</span>
          </motion.h1>

          <p className="hero-subtext">{slides[current].text}</p>

          <div className="hero-actions">
            
            <button className="primary-btn" onClick={showLogin}>
              Start Designing
            </button>
            <button className="secondary-btn" onClick={()=> navigate("/collections")}>Explore Creations</button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Header;
