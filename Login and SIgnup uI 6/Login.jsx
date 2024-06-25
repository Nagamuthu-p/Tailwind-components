import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {motion} from 'framer-motion'
import {fadeIn} from '../variants'

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/auth")
      .then((res) => {
        console.log(res.data.isLoggedIn, "login");
        if (res.data.isLoggedIn) {
          login(res.data.isLoggedIn);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.isLoggedIn) {
        console.log(response.data.name)
        
        login(response.data.isLoggedIn,response.data.name);
        navigate("/");
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
          variants={fadeIn("right", 0.2)}
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
          variants={fadeIn("left", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <form onSubmit={handleSubmit}>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <Link
                className="text-secondary hover:text-blue-700 hover:underline hover:underline-offset-4"
                href="#"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 btnprimary py-[10px] uppercase"
                type="submit"
              >
                Login
              </button>
              {error && (
                <p style={{ color: "red" }} className="mt-3">
                  {error}
                </p>
              )}
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don't have an account?{" "}
            <a
              className="text-primary hover:underline hover:underline-offset-4"
              href="#"
            >
              <Link to="/signup">Sign up</Link>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default Login;
