import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { RiArrowRightUpLongLine } from "react-icons/ri";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useTheme from "../../../hooks/useTheme/useTheme";

const Navbar = () => {
  const [dark, setDark] = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-[#1E1E1E] shadow-sm sticky top-0 z-50">
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
            <ul className="flex gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-[#CAEB66]"
                          : "text-gray-600 dark:text-gray-300 hover:text-[#CAEB66]"
                      }`
                    }>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDark(!dark)}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 transition">
                {dark ? (
                  <MdLightMode className="text-yellow-400" size={20} />
                ) : (
                  <MdDarkMode size={20} />
                )}
              </button>

              <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Sign In
              </button>

              <button className="px-4 py-2 text-sm bg-[#CAEB66] text-black font-semibold rounded-lg hover:opacity-90 transition">
                Sign Up
              </button>

              <button className="p-3 bg-black text-[#CAEB66] rounded-full hover:scale-105 transition">
                <RiArrowRightUpLongLine size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu">
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white dark:bg-[#1E1E1E]">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium ${
                  isActive
                    ? "text-[#CAEB66]"
                    : "text-gray-600 dark:text-gray-300"
                }`
              }>
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
