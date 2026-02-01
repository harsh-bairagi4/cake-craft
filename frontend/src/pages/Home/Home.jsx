import React from 'react'
import Header from "../../components/Header/Header"
import CakeShowcase from '../../components/CakeShowcase/CakeShowcase'
import Pricing from "../../components/Pricing/Pricing"
import Faq from '../../components/Faq/Faq'
import HowItWorks from '../../components/HowItWorks/HowItWorks'
import DemoVideo from '../../components/DemoVideo/DemoVideo'
const Home = ({setShowLogin}) => {
  return (
    <div>
      <Header setShowLogin={setShowLogin}/>
      <HowItWorks/>
      <DemoVideo/>
      <CakeShowcase/>
      <Faq/>
      <Pricing/>
    </div>
  )
}

export default Home
