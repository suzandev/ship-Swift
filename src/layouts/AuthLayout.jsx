import React from "react";
import { Outlet } from "react-router-dom";

// 👉 import your image
import authImg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* LEFT SIDE (FORM AREA) */}
      <div className="flex flex-col justify-center px-6 md:px-16 bg-white">
        <Outlet />
      </div>

      {/* RIGHT SIDE (IMAGE) */}
      <div className="hidden md:flex items-center justify-center bg-green-50">
        <img src={authImg} alt="Delivery Illustration" className="max-w-md" />
      </div>
    </div>
  );
};

export default AuthLayout;
