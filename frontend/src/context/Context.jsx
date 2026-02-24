import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const url =import.meta.env.VITE_BACKEND_URL;
  const labour = 100;

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [cakeList, setCakeList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartDataLoading, setCartDataLoading] = useState(true);
  const [orderDataLoading, setOrderDataLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  const copyCakeList = [...cakeList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleComplete = () => setHasAnimated(true);


  const fetchCakeList = async () => {
    try {
      const response = await axios.get(url + "/api/cake/list");
      if (response.data.success) {
        setCakeList(response.data.data);
        setLoading(false);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setCartDataLoading(false);
    }
  };

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

  const addToCart = async (itemId, customCakeData = null) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (customCakeData) {
      setCakeList((prev) => {
        const exists = prev.find((c) => c._id === itemId);
        if (!exists) return [...prev, customCakeData];
        return prev;
      });
    }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { token } }
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
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const deleteFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/delete",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const loadOrderData = async () => {
    if (!token) {
      setOrderDataLoading(false);
      return;
    }

    setOrderDataLoading(true);
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrderData(response.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setOrderDataLoading(false);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        url + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
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

  useEffect(() => {
    fetchCakeList();
  }, []);

  useEffect(() => {
    loadCartData(token);
  }, [token]);

  const contextValue = {
    url,
    labour,
    showLogin,
    setShowLogin,
    token,
    setToken,
    cakeList,
    cartItems,
    orderData,
    loading,
    cartDataLoading,
    orderDataLoading,

    capitalize,

    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,

    generateImage,

    fetchCakeList,
    loadCartData,
    loadOrderData,

    setCartItems,
    setLoading,

    setCartDataLoading,

    navigate,

    hasAnimated,
    handleComplete,
    setHasAnimated,

    copyCakeList,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;