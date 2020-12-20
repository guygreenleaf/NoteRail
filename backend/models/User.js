const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    numposts:{
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userAccounts", UserSchema);
