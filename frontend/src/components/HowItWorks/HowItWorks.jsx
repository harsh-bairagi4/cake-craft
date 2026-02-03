import React from "react";
import "./HowItWorks.css";
import BounceCards from "../BounceCards/BounceCards";

const images = [
  "works1.png",
  "works2.png",
  "works3.png",
  "works4.png",
];

const transformStyles = [
  "rotate(4deg) translate(-140px)",
  "rotate(0deg) translate(-70px)",
  "rotate(-4deg)",
  "rotate(4deg) translate(70px)",
  "rotate(-4deg) translate(140px)",
];

const HowItWorks = () => {
  return (
    <section className="how">
    

      {/* BOUNCE CARDS VISUAL */}
      <div className="how-bounce-wrapper">
        <BounceCards
          className="custom-bounceCards"
          images={images}
          containerWidth={520}
          containerHeight={260}
          animationDelay={0.8}
          animationStagger={0.07}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover
        />
      </div>
    </section>
  );
};

export default HowItWorks;
