import React, { useContext, useState } from "react";
import "./LoginPopUp.css"
import { Context } from "../../context/Context";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LoginPopUp = ({ setShowLogin}) => {
  const navigate = useNavigate();
  const {url,token, setToken} = useContext(Context);
  const [isLogin, setIsLogin] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name] : value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(isLogin == true){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl, data);
    if(response.data.success){
      console.log(token);
      setToken(response.data.token);
      console.log(token)
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      navigate("/generate");
    }
    else{
      alert(response.data.message);
    }


  }

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={()=>setShowLogin(false)}>✕</button>

        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        <form onSubmit={onLogin} className="auth-form">
          {!isLogin && (
            <input onChange={onChangeHandler} name="name" value={data.name} type="text" placeholder="Full Name" />
          )}

          <input onChange={onChangeHandler} name="email" value={data.email} type="email" placeholder="Email Address" />
          <input onChange={onChangeHandler} name="password" value={data.password} type="password"  placeholder="Password" />

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPopUp;
