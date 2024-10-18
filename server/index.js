const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    if (!req.body) {
      return res.status(400).send("Bad Request");
    }

    const options = req.body;

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(400).send("Bad Request");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
