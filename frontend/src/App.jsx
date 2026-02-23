import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import CakeBuilder from "./pages/CakeBuilder/CakeBuilder";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Collections from "./pages/Collections/Collections";
import MyOrders from "./pages/MyOrders/MyOrders";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "sonner";
import Subscription from "./components/Subscription/Subscription";
import Help from "./components/Help/Help";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Verify from "./components/Verify/Verify";
import { Context } from "./context/Context";

const App = () => {
  const { showLogin } = useContext(Context);

  return (
    <>
      {showLogin && <LoginPopUp />}
      <Toaster position="top-center" richColors duration={3500} />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
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
            path="/verify"
            element={
              <ProtectedRoute>
                <Verify />
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
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;