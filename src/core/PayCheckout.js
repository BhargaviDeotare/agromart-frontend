import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { API } from "../backend";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
const PayCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
    contactNumber: "",
  });
  const { address, success, contactNumber } = data;
  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const user = isAuthenticated() && isAuthenticated().user;
  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: success ? "" : "none" }}
      >
        <h4>Order Placed successfully</h4>
      </div>
    );
  };
  const loadScript = (src) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      return true;
    };
    script.onerror = () => {
      return false;
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);
  async function displayRazorPay() {
    const data = await fetch(`${API}/razorpay`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: getFinalPrice().toString(),
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    const options = {
      key: "rzp_test_ZmAZxSAt5kg5uR",
      amount: data.amount.toString(), // 2000 paise = INR 20
      currency: data.currency,
      name: "Tushar water works",
      description: "Test Transaction",
      image: "http://localhost:8010/api/logo",
      order_id: data.id,
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature)
        console.log(response);

        const OrderData = {
          products: products,
          transaction_id: response.razorpay_payment_id,
          amount: getFinalPrice(),
          address: address,
          contact: contactNumber,
        };
        createOrder(userId, token, OrderData)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
        setData({ ...data, success: true, address: "", contactNumber: "" });
        setReload(!reload);
        cartEmpty(() => {
          console.log("cart is empty");
        });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: contactNumber,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <h3 className="text-dark">Your Final Price :₹{getFinalPrice()}</h3>
      {successMessage()}
      <input
        type="text"
        placeholder="Enter your address"
        onChange={(e) => setData({ ...data, address: e.target.value })}
      />
      <br />
      <input
        type="Number"
        placeholder="Enter your Number"
        onChange={(e) => setData({ ...data, contactNumber: e.target.value })}
      />
      <br />
      <Button onClick={displayRazorPay} variant="outlined">
        checkout
      </Button>
    </div>
  );
};

export default PayCheckout;
