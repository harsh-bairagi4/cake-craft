import React from 'react'
import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from './components/Navbar/Navbar'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import CakeBuilder from './pages/CakeBuilder/CakeBuilder'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path="/" element={<Home setShowLogin={setShowLogin}/>}/>
      <Route path='/cart' element={<Cart/>} />
      <Route path='/place-order' element={<PlaceOrder/>} />
      <Route path="/myorders" element={<MyOrders/>} />
      <Route path='/generate' element={<CakeBuilder/>}/>
    </Routes>
    </div>
    </>
    
  )
}

export default App
