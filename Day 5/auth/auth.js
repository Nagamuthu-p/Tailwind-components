const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/UserModel");
const middleware = require("../middleware/middleware");
// const bcrypt = require("bcrypt");
let k = "";

router.get("/", (req, res) => {
  if (k.length) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    req.session.nagamuthu = newUser;

    res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (err) {
    console.error("Error during signup:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid username or password.", isLoggedIn: false });
    }

    req.session.nagamuthu = user.username;
    k = req.session.nagamuthu;

    res
      .status(200)
      .json({
        message: "User logged in successfully.",
        isLoggedIn: true,
        name: req.session.nagamuthu,
      });
  } catch (err) {
    console.error("Error during login:", err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later..." });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("succ");

      return res.status(500).json({ message: "Server Error" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    k = "";
    res.status(201).json({ message: "Logout successful", isLoggedIn: false });
  });
});

module.exports = router;
