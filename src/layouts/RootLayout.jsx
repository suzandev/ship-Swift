import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import ScrollToTopButton from "../pages/shared/ScrollToTopButton/ScrollToTopButton";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <Outlet />
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default RootLayout;
