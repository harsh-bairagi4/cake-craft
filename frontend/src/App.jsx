import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import CakeBuilder from "./pages/CakeBuilder/CakeBuilder";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Collections from "./pages/Collections/Collections"
import MyOrders from "./pages/MyOrders/MyOrders";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {Toaster} from 'sonner';
import Subscription from "./components/Subscription/Subscription";
import Help from "./components/Help/Help";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <Toaster
        position="top-center"
        richColors
        duration={3500}
      />
      <div className="app">
         
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home setShowLogin={setShowLogin} />} />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <CakeBuilder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place-order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/collections"
            element={
                <Collections setShowLogin={setShowLogin}/>
            }
          />
          <Route 
            path="/subscription"
            element={   
                <Subscription />
            }
          />
          <Route
            path="/help"
            element={   
                <Help />
            }
          />
          <Route
          path="/contact"
          element={<Contact/>
          }
          />
          <Route
          path="/about"
          element={<About/>
          }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
