// global packages requiring
const express = require("express");
const dotenv = require("dotenv").config();

// variables
const app = express();

// local packages requiring
const connectDB = require("./utils/connectDB");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

// global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const userRoute = require("./routes/userRoute");

app.use("/api", userRoute);

// handling errors
app.use(errorHandlerMiddleware);

// no route page
app.use("*", (req, res, next) => {
  res.status(400).json({ success: "fail", message: "No such route exists" });
});

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
