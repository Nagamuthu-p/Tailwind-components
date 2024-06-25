import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
// import Message from "./Message";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate("");
  const { isLoggedIn } = useAuth();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors["name"] = "Name is required.";
    }

    if (!username) {
      isValid = false;
      errors["username"] = "Username is required.";
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Email is required.";
    }

    // if (!password) {
    //   isValid = false;
    //   errors["password"] = "Password is required.";
    // } else if (
    //   !/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/.test(
    //     password
    //   )
    // ) {
    //   isValid = false;
    //   errors["password"] =
    //     "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.";
    // }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          name,
          email,
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavBar />

      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <motion.div
          className="md:w-1/3 max-w-s"
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </motion.div>
        <motion.div
          className="md:w-1/3 max-w-sm"
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <form onSubmit={handleSubmit}>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && (
              <p style={{ color: "red" }} className="mt-1 text-xs">
                {formErrors.name}
              </p>
            )}
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {formErrors.username && (
              <p style={{ color: "red" }} className="mt-1 text-xs">
                {formErrors.username}
              </p>
            )}
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && (
              <p style={{ color: "red" }} className="mt-1 text-xs">
                {formErrors.email}
              </p>
            )}
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && (
              <p style={{ color: "red" }} className="mt-1 text-xs">
                {formErrors.password}
              </p>
            )}
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 btnprimary py-[10px] uppercase"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            {error && (
              <p style={{ color: "red" }} className="mt-3">
                {error}
              </p>
            )}
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Already Have an Account?{" "}
            <a
              className="text-primary hover:underline hover:underline-offset-4"
              href="#"
            >
              <Link to="/login">Login</Link>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Signup;
