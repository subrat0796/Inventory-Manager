const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      enum: ["superUser", "adminUser"],
      default: "adminUser",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      min: 4,
      max: 25,
    },
    userName: {
      type: String,
      required: [true, "Please add a username"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add a email"],
      trim: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
