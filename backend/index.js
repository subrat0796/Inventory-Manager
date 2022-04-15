// global packages requiring
const express = require("express");
const dotenv = require("dotenv").config();

// variables
const app = express();

// local packages requiring
const connectDB = require("./utils/connectDB");

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start func
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => console.log("Database connected"));
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  } catch (err) {
    console.log(err);
  }
};

start();
