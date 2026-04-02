import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSignIn } = useAuth();

  const [useImageUrl, setUseImageUrl] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "photo" && useImageUrl) {
      setPreview(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = reader.result;

      setFormData((prev) => ({
        ...prev,
        photo: img,
      }));

      setPreview(img);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUser(formData.email, formData.password);
      const user = result.user;

      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photo || "https://i.ibb.co/4pDNDk1/avatar.png",
      });

      await user.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      await updateProfile(user, {
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      await user.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Link to="/">
        <h2 className="text-2xl font-bold text-[#1E1E1E] dark:text-white mb-16">
          🚚 Ship <span className="text-[#CAEB66]">Swift</span>
        </h2>
      </Link>

      <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>

      <p className="text-gray-500 mt-1 mb-6">Register with ShipSwift</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

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

        {/* IMAGE TOGGLE  */}
        <div className="flex gap-4 text-sm">
          <button
            type="button"
            onClick={() => setUseImageUrl(false)}
            className={
              !useImageUrl
                ? "text-green-500 font-bold border rounded-sm border-green-500 p-1"
                : ""
            }>
            Upload Image
          </button>

          <button
            type="button"
            onClick={() => setUseImageUrl(true)}
            className={
              useImageUrl
                ? "text-green-500 font-bold border rounded-sm border-green-500 p-1"
                : ""
            }>
            Image Link
          </button>
        </div>

        {/* IMAGE INPUT */}
        {!useImageUrl ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
        ) : (
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Paste image URL"
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}

        {/* PREVIEW  */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-12 h-12 rounded-full object-cover border"
          />
        )}

        <button
          type="submit"
          className="w-full bg-[#CAEB66] hover:bg-[#9db555] py-2 rounded-lg transition">
          Register
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>

        <div className="flex items-center gap-2 my-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-400">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-lg hover:bg-gray-100 transition">
          <FcGoogle size={20} />
          Register with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
