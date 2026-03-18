import { FaLinkedinIn, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] text-white py-16 mt-20 rounded-3xl mx-4">
      <div className="max-w-5xl mx-auto text-center px-4">
        {/* Logo */}
        <h2 className="text-3xl font-bold mb-4">
          Ship<span className="text-[#CAEB66]">Swift</span>
        </h2>

        {/* Description */}
        <p className="text-gray-400 max-w-xl mx-auto">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-600 my-8"></div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-gray-300">
          <span>Services</span>
          <span>Coverage</span>
          <span>About Us</span>
          <span>Pricing</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-600 my-8"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <FaLinkedinIn />
          </div>
          <div className="bg-gray-300 text-black p-3 rounded-full">
            <FaXTwitter />
          </div>
          <div className="bg-blue-500 p-3 rounded-full">
            <FaFacebookF />
          </div>
          <div className="bg-red-600 p-3 rounded-full">
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
