import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { RiArrowRightUpLongLine } from "react-icons/ri";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useTheme from "../../../hooks/useTheme/useTheme";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const [dark, setDark] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-[#1E1E1E] shadow-sm sticky top-0 py-3 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="text-2xl font-bold text-[#1E1E1E] dark:text-white">
            Ship<span className="text-[#CAEB66]">Swift</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-colors duration-300 ${
                        isActive
                          ? "text-[#CAEB66]"
                          : "text-gray-600 dark:text-gray-300 group-hover:text-[#CAEB66]"
                      }`
                    }>
                    {link.name}
                  </NavLink>

                  {/* Hover Underline */}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#CAEB66] transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDark(!dark)}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-transform duration-300">
                {dark ? (
                  <MdLightMode className="text-yellow-400" size={20} />
                ) : (
                  <MdDarkMode size={20} />
                )}
              </button>

              {/*  Auth UI */}
              {user ? (
                <>
                  {/* User Image */}
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="user"
                    className="w-9 h-9 rounded-full border"
                  />

                  {/* User Name */}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.displayName || "User"}
                  </span>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-[#CAEB66] dark:text-gray-100 dark:hover:bg-[#CAEB66] dark:hover:text-black transition">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Sign In */}
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                    Sign In
                  </Link>

                  {/* Sign Up */}
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm bg-[#CAEB66] text-black font-semibold rounded-lg hover:scale-105 transition-transform duration-300">
                    Sign Up
                  </Link>
                </>
              )}

              {/* Arrow Button */}
              <button className="p-3 bg-black text-[#CAEB66] rounded-full hover:rotate-45 transition-transform duration-300">
                <RiArrowRightUpLongLine size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-transform duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu">
            {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white dark:bg-[#1E1E1E]`}>
        <div className="px-6 pb-6 pt-2 space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-[#CAEB66]"
                    : "text-gray-600 dark:text-gray-300 hover:translate-x-1"
                }`
              }>
              {link.name}
            </NavLink>
          ))}

          {/* 🔐 Mobile Auth */}
          {user ? (
            <button onClick={handleLogout} className="text-red-500 font-medium">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
