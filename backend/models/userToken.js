const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    token: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: [true, "Please provide a Expiry Date"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("token", tokenSchema);
