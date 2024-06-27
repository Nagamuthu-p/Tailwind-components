import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      navigate("/reset-password");
    } catch (err) {
      setError(
        err.response.data.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <>
      <NavBar />
      <section className="h-screen flex justify-center items-center p-10">
        <div className="w-full max-w-md ">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4">Forgot Password</h2>
            <input
              className="w-full px-4 py-2 border rounded mt-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            //   required
            />
            <button
              className="w-full py-2 mt-4 btnprimary text-white rounded"
              type="submit"
            >
              Send OTP
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
