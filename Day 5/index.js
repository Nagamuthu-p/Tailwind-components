const express = require("express");
const cors = require("cors");
const connect = require("./db/Dbconnect"); // Ensure this file exists and connects to your MongoDB
const cookieParser = require("cookie-parser");
const session = require("express-session");
const authRoutes = require("./auth/auth");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173", credentials: true ,methods:['POST','GET']}));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(
  session({
    secret: "nagamuthu",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // set secure to false if using HTTP
  })
);

// Routes
app.use("/api/auth", authRoutes);




app.listen(3001, (req,res) => {
  console.log("server running on port 3000");
});
