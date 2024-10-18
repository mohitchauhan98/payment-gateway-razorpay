import "./App.css";
import React from "react";

function App() {
  const paymentHandler = async (event) => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded yet.");
      return;
    }

    const amount = 500;
    const currency = "INR";
    const receiptId = "123456789";

    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();
    console.log("order", order);

    var options = {
      key: process.env.rzp_test_w8cRaylkl3blDC,
      amount,
      currency,
      name: "Mohit ecommerce",
      description: "Test Transaction",
      image: "https://i.ibb.co/5Y3m33n/test.png",
      order_id: order.id,
      handler: async function (response) {
        alert("transaction successful");
      },
      prefill: {
        name: "Mohit Chauhan",
        email: "mohit29@gmail.com",
        contact: "90000000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <div className="App">
      <div className="product">
        <h1>Razorpay Payment Gateway</h1>
        <button onClick={paymentHandler}>Pay Now</button>
      </div>
    </div>
  );
}

export default App;
