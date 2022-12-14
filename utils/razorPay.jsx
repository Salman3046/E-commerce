import React from "react";
import { useSelector } from "react-redux";
import useToaster from "../hooks/useToaster";

const razorPay = (amount,settings,payment) => {

  console.log(payment)
  const toaster = useToaster();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorPay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toaster({type:"error",content:"You are offline... Failed to load RazorPay SDK"});
      return;
    }

    const options = {
      key: payment?.production_public_key || payment?.public_key,
      currency: "INR",
      amount: amount * 100,
      name: settings?.site_title,
      description: "Thanks for purchasing",
      image: `${import.meta.env.VITE_IP_URL}/${settings?.logo}`,
      handler: function (response) {
        console.log(response)
        toaster({type:"success",content:"Payment Successfully"});
        return response
      },
      prefill: {
        name: settings?.site_title,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return displayRazorPay;

};

export default razorPay;
