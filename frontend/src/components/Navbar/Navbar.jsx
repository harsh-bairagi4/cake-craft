import React, { useContext, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = ({ setShowLogin }) => {
  const { token, setToken, navigate, setCartItems } = useContext(Context);
  const [openMenu, setOpenMenu] = useState(false);

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
    setCartItems({});
    
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div onClick={() => navigate("/")} className="navbar-logo">
        Cake<span>Craft</span>
      </div>


      {/* RIGHT ACTION */}
      {!token ? (
        <button className="nav-btn" onClick={() => setShowLogin(true)}>
          Sign In
        </button>
      ) : (
        <div className="user-profile">
            <div onClick={() => navigate("/cart")} className="cart-img">
              <img src="/cart.png" alt="" />
            </div>
            <div
              className="profile-wrapper"
              onMouseEnter={() => setOpenMenu(true)}
              onMouseLeave={() => setOpenMenu(false)}
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="profile-img"
              />
              {openMenu && (
              <div className="profile-dropdown">
                <p onClick={() => navigate("/myorders")}>My Cakes</p>
                <p onClick={logoutHandler}>Logout</p>
              </div>
            )}
            </div>
        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
