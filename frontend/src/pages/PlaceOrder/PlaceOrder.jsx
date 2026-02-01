import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    getTotalCartAmount,
    token,
    cakeList,
    cartItems,
    url,
  } = useContext(Context);

  /* =======================
     FORM STATE
  ======================= */
  const [data, setData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    pincode: "",
    phone: "",
    state: "",
    instructions: "",
  });

  /* =======================
     HANDLE INPUT CHANGE
  ======================= */
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================
     PLACE ORDER HANDLER
  ======================= */
  const placeOrder = async (e) => {
    e.preventDefault();

    // Build ordered items array
    let orderItems = [];

    cakeList.forEach((cake) => {
      const qty = cartItems[cake._id];
      if (qty > 0) {
        orderItems.push({
          cakeId: cake._id,
          name: cake.name,
          price: cake.price,
          quantity: qty,
          image: cake.image,
          description: cake.description,
        });
      }
    });

    const orderPayload = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50, // delivery charge
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderPayload,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const {session_url} = response.data;
        window.location.replace(session_url);
        alert("🎉 Order placed successfully!");
        navigate("/my-orders");
      } else {
        alert(response.data.message || "Order failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing order");
    }
  };
   /* =======================
     AUTH + EMPTY CART GUARD
  ======================= */
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  /* =======================
     JSX
  ======================= */
  return (
    <form className="order-page" onSubmit={placeOrder}>
      <h2>📦 Place Your Order</h2>

      <div className="order-container">
        {/* LEFT: DELIVERY DETAILS */}
        <div className="order-form">
          <h3>Delivery Details</h3>

          <input
            required
            name="fullName"
            value={data.fullName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Full Name"
          />

          <input
            required
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Mobile Number"
          />

          <input
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email Address"
          />

          <input
            required
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street Address"
          />

          <input
            required
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City"
          />

          <input
            required
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State"
          />

          <input
            required
            name="pincode"
            value={data.pincode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Pincode"
          />

          <textarea
            name="instructions"
            value={data.instructions}
            onChange={onChangeHandler}
            placeholder="Delivery instructions (optional)"
            rows="3"
          />
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Total</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Charge</span>
            <span>₹{getTotalCartAmount() === 0 ? 0 : 50}</span>
          </div>

          <div className="summary-row total">
            <span>Total Payable</span>
            <span>
              ₹
              {getTotalCartAmount() === 0
                ? 0
                : getTotalCartAmount() + 50}
            </span>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
