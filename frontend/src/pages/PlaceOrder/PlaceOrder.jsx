import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { toast } from "sonner";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    cakeList,
    cartItems,
    url,
    setCartItems,
    navigate,
  } = useContext(Context);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);

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

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    const orderItems = cakeList
      .filter((cake) => cartItems[cake._id] > 0)
      .map((cake) => ({
        cakeId: cake._id,
        name: cake.name,
        price: cake.price,
        quantity: cartItems[cake._id],
        image: cake.image,
        description: cake.description,
      }));

    if (orderItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const payload = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 50,
    };

    setIsPlacing(true);
    try {
      const endpoint =
        paymentMethod === "stripe" ? "/api/order/place" : "/api/order/placecod";

      const res = await axios.post(url + endpoint, payload, {
        headers: { token },
      });

      if (res.data.success) {
        if (paymentMethod === "stripe") {
          window.location.replace(res.data.session_url);
        } else {
         
          setCartItems({});
          toast.success("Order placed successfully 🎉");
          navigate("/myorders");
        }
      } else {
        toast.error("Order failed. Please try again.");
        setIsPlacing(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setIsPlacing(false);
    }
  };

  return (
    <form className="order-page" onSubmit={placeOrder}>
      <h2>🍰 Place Your Order</h2>

      <div className="order-container">

        <div className="order-form">
          <h3>Delivery Details</h3>
          <input name="fullName" required onChange={onChangeHandler} placeholder="Full Name" />
          <input name="phone" required onChange={onChangeHandler} placeholder="Mobile Number" />
          <input name="email" required onChange={onChangeHandler} placeholder="Email Address" />
          <input name="street" required onChange={onChangeHandler} placeholder="Street Address" />
          <input name="city" required onChange={onChangeHandler} placeholder="City" />
          <input name="state" required onChange={onChangeHandler} placeholder="State" />
          <input name="pincode" required onChange={onChangeHandler} placeholder="Pincode" />
          <textarea
            name="instructions"
            rows="3"
            onChange={onChangeHandler}
            placeholder="Delivery instructions (optional)"
          />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items Total</span>
            <span>₹{getTotalCartAmount()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹{getTotalCartAmount() ? 50 : 0}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{getTotalCartAmount() ? getTotalCartAmount() + 50 : 0}</span>
          </div>

          <div className="payment-methods">
            <label className={paymentMethod === "stripe" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("stripe")}
              />
              Pay Online (Stripe)
            </label>

            <label className={paymentMethod === "cod" ? "active" : ""}>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
          </div>

          <button
            className="place-order-btn"
            disabled={!paymentMethod || getTotalCartAmount() === 0 || isPlacing}
          >
            {isPlacing
              ? paymentMethod === "stripe"
                ? "Redirecting to Stripe..."
                : "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;