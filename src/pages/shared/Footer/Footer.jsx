import { NavLink } from "react-router-dom";
import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const links = [
    { name: "Services", path: "/services" },
    { name: "Coverage", path: "/coverage" },
    { name: "About Us", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#1E1E1E] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="text-center">
          {/* Logo */}
          <h2 className="text-3xl font-bold">
            Ship<span className="text-[#CAEB66]">Swift</span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-700 my-10"></div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center text-sm">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive ? "text-[#CAEB66]" : "text-gray-400 hover:text-white"
                }`
              }>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-700 my-10"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          <a
            href="#"
            aria-label="LinkedIn"
            className="bg-blue-600 hover:scale-110 transition p-3 rounded-full">
            <FaLinkedinIn />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="bg-gray-800 hover:scale-110 transition p-3 rounded-full">
            <FaXTwitter />
          </a>

          <a
            href="#"
            aria-label="Facebook"
            className="bg-blue-500 hover:scale-110 transition p-3 rounded-full">
            <FaFacebookF />
          </a>

          <a
            href="#"
            aria-label="YouTube"
            className="bg-red-600 hover:scale-110 transition p-3 rounded-full">
            <FaYoutube />
          </a>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-500 text-xs mt-10">
          © {new Date().getFullYear()} ShipSwift. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
