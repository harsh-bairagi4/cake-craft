import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Context } from "../../context/Context";

const Navbar = () => {
  const {setShowLogin, token, setToken, navigate, setCartItems } = useContext(Context);
  const [openMenu, setOpenMenu] = useState(false);

  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
    setCartItems({});
  };

  return (
    <nav className="navbar">

      <div onClick={() => navigate("/")} className="navbar-logo">
        Cake<span>Craft</span>
      </div>

      {!token ? (
        <button className="nav-btn" onClick={() => setShowLogin(true)}>
          Sign In
        </button>
      ) : (
        <div className="user-profile">
            <div onClick={() => navigate("/cart")} className="cart-img">
              <img src="favicon.png" alt="Cart" />
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
                <p onClick={() => navigate("/myorders")}>My Orders</p>
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
