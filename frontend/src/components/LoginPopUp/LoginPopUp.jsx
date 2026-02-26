import { useContext, useState } from "react";
import "./LoginPopUp.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "sonner";
import { assets } from "../../assets/assets.js";

const LoginPopUp = () => {
  const { url, setShowLogin, setToken, navigate } = useContext(Context);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeState = () => {
    setIsLogin(!isLogin);
    setData({
      name: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";
    try {
      const response = await axios.post(url + endpoint, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        navigate("/generate");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={() => setShowLogin(false)}>
          ✕
        </button>

        <div className="auth-header">
          <span className="auth-badge">
            <span className="black">🍰 Cake</span>Craft
          </span>
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin
              ? "Login to continue designing your cake"
              : "Sign up to create and save custom cakes"}
          </p>
        </div>

        <form className="auth-form" onSubmit={onLogin}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <div>
            <input
              type={showPassword? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            <img
              onClick={() => togglePassword()}
              src={showPassword ? assets.view : assets.hide}
              alt=""
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? "New here?" : "Already have an account?"}
          <span onClick={() => changeState()}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
