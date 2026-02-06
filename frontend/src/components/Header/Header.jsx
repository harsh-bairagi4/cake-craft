import { useEffect, useState, useContext } from "react";
import "./Header.css";
import { Context } from "../../context/Context";
import { motion } from "framer-motion";
import slides from "../../assets/assets";

const Header = ({ setShowLogin }) => {
  const { token ,navigate} = useContext(Context);
 
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
      initial={{
        opacity: 0,
        filter: "blur(2px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.1,
        ease: "easeOut",
      }}
    >
      <div className="hero-glow" />

      <div className="hero-container center">
        <div className="hero-text">
          <span className="hero-badge">{slides[current].badge}</span>

          <motion.h1
            className="hero-title"
            initial={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(2px)",
            }}
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
            <button className="secondary-btn">Explore Creations</button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Header;
