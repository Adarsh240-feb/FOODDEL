import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-orange-100 dark:bg-[#1F1D2B] text-black dark:text-white pt-16 pb-10 px-6 lg:px-20 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo & Description (left) */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">FlavourFlow</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Your FlavourFlow app for delicious and fast food delivery. Taste the joy
            at your doorstep.
          </p>
          <div className="flex gap-4 mt-4 text-orange-500">
            {/* Replace the href values with your actual social URLs */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-600"
            >
              <FaFacebookF className="cursor-pointer" />
            </a>

            <a
              href="https://www.instagram.com/just_adarshhh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-600"
            >
              <FaInstagram className="cursor-pointer" />
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-orange-600"
            >
              <FaTwitter className="cursor-pointer" />
            </a>

            <a
              href="https://www.linkedin.com/in/adarsh-kesharwani-bba666315/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-orange-600"
            >
              <FaLinkedinIn className="cursor-pointer" />
            </a>
          </div>
        </div>
  {/* Contact Info (right) */}
  <div className="md:w-1/2 md:text-right">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="hover:text-orange-400 transition">
              Email: kesharwaniadarsh24@gmail.com
            </li>
            <li className="hover:text-orange-400 transition">
              Phone: +91 9305855671
            </li>
            <li className="hover:text-orange-400 transition">
              Location: Prayagraj, India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 border-t mt-4 pt-4">
        @copyright 2025 | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;