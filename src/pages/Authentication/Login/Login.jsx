import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const { googleSignIn, signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation(); // ✅ added

  // ✅ smart redirect (FIX)
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Email/Password Login (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn(formData.email, formData.password);
      console.log(result.user);

      // 🔥 SMART REDIRECT FIX
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login (FIXED)
  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await googleSignIn();
      console.log(result.user);

      // 🔥 SMART REDIRECT FIX
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <Link to="/">
        <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white mb-16">
          🚚 Ship <span className="text-[#CAEB66]">Swift</span>
        </h2>
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
      <p className="text-gray-500 mt-1 mb-6">Login with ShipSwift</p>

      {/* ❌ Error Message */}
      {errorMsg && (
        <p className="text-red-500 text-sm text-center mb-3">{errorMsg}</p>
      )}

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
        <div className="relative">
          <label className="text-sm text-gray-600">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mt-1 px-4 py-2 pr-10 border rounded-lg bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-500">
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </span>
        </div>

        {/* Forgot */}
        <div className="text-right">
          <Link
            to="/forgotPassword"
            className="text-sm text-gray-500 hover:text-green-500">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#CAEB66] hover:bg-[#9db555] text-black py-2 rounded-lg transition">
          {loading ? "Logging in..." : "Login"}
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
          onClick={handleGoogleLogin}
          type="button"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          {loading ? "Please wait..." : "Login with Google"}
        </button>
      </form>
    </div>
  );
};

export default Login;
