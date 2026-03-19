import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
      <p className="text-gray-500 mt-1 mb-6">Login with ShipSwift</p>

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

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Forgot */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-green-500">
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#CAEB66] hover:bg-[#9db555] text-black py-2 rounded-lg transition">
          Login
        </button>

        {/* Register */}
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-500 hover:underline">
            Register
          </Link>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
