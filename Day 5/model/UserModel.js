const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    // profilepic: { type: String, default: "/image/profile.jpeg" },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userschema);

module.exports = user;
