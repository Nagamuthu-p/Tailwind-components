import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/verify-otp",
        { email, otp }
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
      <section className="h-screen flex justify-center items-center">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-4">Verify OTP</h2>
            <input
              className="w-full px-4 py-2 border rounded mt-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="w-full px-4 py-2 border rounded mt-2"
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button
              className="w-full py-2 mt-4 bg-blue-500 text-white rounded"
              type="submit"
            >
              Verify OTP
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default VerifyOtp;
