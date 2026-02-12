import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const labour = 100;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [cartItems, setCartItems] = useState({});
  const [cakeList, setCakeList] = useState([]);

  /* =======================
     HELPERS
  ======================= */
  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  /* ================= IMAGE GENERATION ================= */
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        url + "/api/image/generate-image",
        { prompt },
        { headers: { token } },
      );
      if (data.success) {
        return data.resultImage;
      }
      if (data.creditBalance === 0) {
        toast("You don't have enough credits");
        navigate("/subscription");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  /* ================= CART ACTIONS ================= */
  const addToCart = async (itemId, customData = null) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      try {
         await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } },
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const deleteFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = {...prev};
      delete updated[itemId];
      return updated;
    });

    if(token){
      try {
        const response = await axios.post(url + "/api/cart/delete",
          {itemId},
          {headers: {token}}
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }
   /* ================= FETCH CAKES ================= */
  const fetchCakeList = async () => {
    try {
      const response = await axios.get(url + "/api/cake/list");
      if (response.data.success) {
        setCakeList(response.data.data);
        console.log(response.data.data);
        console.log(cakeList);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  /* ================= TOTAL ================= */
  const getTotalCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const cake = cakeList.find((item) => item._id === id);
      if (cake) {
        total += cake.price * cartItems[id];
      }
    }
    return total;
  };

  /* ================= LOAD CART ================= */
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } },
      );
      console.log(response.data);
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /* ================= INIT ================= */
   useEffect(()=>{
      console.log(cakeList);
      console.log(cartItems);
    }, []);
  useEffect(()=>{
    fetchCakeList();
    console.log(cakeList);
  }, []);


  useEffect(() => {
    console.log("COMPONENT RE=RENDER");
    console.log(cakeList);

    console.log("Component Re-render Cart Data");
    console.log(cartItems);
  })



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      loadCartData(localStorage.getItem("token"));
    }
    console.log(token);
    console.log(cakeList);
    console.log(cartItems);
  }, [token]);

  

  const contextValue = {
    url,
    token,
    labour,
    setToken,
    generateImage,
    addToCart,
    removeFromCart,
    deleteFromCart,
    cakeList,
    cartItems,
    getTotalCartAmount,
    fetchCakeList,
    capitalize,
    setCartItems,
    loadCartData,
    navigate
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
