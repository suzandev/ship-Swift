import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 👈 added

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white mb-16">
        🚚 Ship <span className="text-[#CAEB66]">Swift</span>
      </h2>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
      <p className="text-gray-500 mt-1 mb-6">
        Enter your email address and we'll send you a reset link.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#CAEB66] hover:bg-[#9db555] text-black py-2 rounded-lg transition">
          Send
        </button>

        <p className="text-sm text-center text-gray-500">
          Remember your password?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
