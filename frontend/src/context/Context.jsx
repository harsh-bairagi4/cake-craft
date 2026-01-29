import axios from "axios";
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

const ContextProvider = (props) => {
  const navigate = useNavigate();
  const url = "http://localhost:4000";
  const labour = 100;
  const [token, setToken] = useState("");

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        url + "/api/image/generate-image",
        { prompt },
        { headers: { token } },
      );
      if (data.success) {
        return data.resultImage;
      } else {
        console.log("Hi");
        console.log(data.message);
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error);
      window.alert(error.message);
    }
  };

  const contextValue = {
    url,
    token,
    labour,
    setToken,
    generateImage
  };
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
