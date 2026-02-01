import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const labour = 100;

  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [cakeList, setCakeList] = useState([]);


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
        navigate("/buy");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
/* ================= CART ACTIONS ================= */
  const addToCart = async (itemId, customData = null) => {
     setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } },
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = {...prev};
      if(updated[itemId] > 1){
        updated[itemId] -= 1;
      }
      else{
        delete updated[itemId];
      }
      return updated;
    });
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } },
      );
    }
  };
    /* ================= FETCH CAKES ================= */
  const fetchCakeList = async () => {
    const response = await axios.get(url + "/api/cake/list");
    if (response.data.success) {
      setCakeList(response.data.data);
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
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData || {});
    
  };
  /* ================= INIT ================= */
  useEffect(() => {
    async function loadData() {
      await fetchCakeList();
      const savedToken = localStorage.getItem("token");
      console.log(token);
      if (savedToken) {
        setToken(savedToken);
        console.log(token);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    url,
    token,
    labour,
    setToken,
    generateImage,
    addToCart,
    removeFromCart,
    cakeList,
    cartItems,
    getTotalCartAmount,
  };
  

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
