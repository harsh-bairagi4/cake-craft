import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import CakeShowcase from "../../components/CakeShowcase/CakeShowcase";
import Pricing from "../../components/Pricing/Pricing";
import Faq from "../../components/Faq/Faq";
import DemoVideo from "../../components/DemoVideo/DemoVideo";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
const Home = ({ setShowLogin }) => {
  
  return (
    <div>
     
      <Header setShowLogin={setShowLogin} />
      <DemoVideo />
      <CakeShowcase />
      <HowItWorks/>
      <Faq />
      <Pricing />
        
    </div>
  );
};

export default Home;
