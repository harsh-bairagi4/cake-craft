import React, { useContext, useEffect, useState } from "react";
import "./Verify.css";
import { useSearchParams } from "react-router-dom";
import { Context } from "../../context/Context";
import { toast } from "sonner";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, navigate, setCartItems, token } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId },
        { headers: { token } } 
      );

      if (response.data.success) {
       
        setCartItems({});
        toast.success("Payment Successful 🎉");
        navigate("/myorders");
      } else {
        
        toast.error("Payment failed. Your cart is intact.");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  if (loading) {
    return (
      <div className="verify-wrapper">
        <div className="verify-card skeleton-card">
          <div className="skeleton skeleton-icon"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-subtitle"></div>
          <div className="skeleton-rows">
            <div className="skeleton skeleton-row"></div>
            <div className="skeleton skeleton-row short"></div>
            <div className="skeleton skeleton-row"></div>
          </div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <p>Processing complete.</p>
      </div>
    </div>
  );
};

export default Verify;