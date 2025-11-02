import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { items, toggleCart } = useCart();
  const { user, username, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const count = items.reduce((s, it) => s + it.quantity, 0);

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // fallback to hash navigation
      window.location.hash = `#${id}`;
    }
  };

  return (
  <header className="fixed top-0 left-0 right-0 z-60 bg-white/90 dark:bg-[#0b1220]/90 text-black dark:text-white py-4 px-5 lg:px-14 flex items-center justify-between shadow-sm transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-orange-500">
        <Logo size={28} />
        <span>FlavourFlow</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex space-x-8 font-medium">
        <a href="/" className="hover:text-orange-400 transition">
          Home
        </a>
        <a href="#foods" onClick={(e) => handleScroll(e, "foods")} className="hover:text-orange-400 transition">
          Foods
        </a>
        <a href="/" className="hover:text-orange-400 transition">
          Offers
        </a>
        <a href="#service" onClick={(e) => handleScroll(e, "service")} className="hover:text-orange-400 transition">
          Service
        </a>
      </nav>

      {/* Cart & Button */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> 
        <button onClick={toggleCart} className="relative text-orange-400 text-xl">
          <FaShoppingCart />
          {count > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{count}</span>}
        </button>
        {user ? (
          <div className="flex items-center gap-2">
            <button className="text-sm px-3 py-1">{username ? `Hi, ${username}` : user.email}</button>
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Logout</button>
          </div>
        ) : (
          <>
            <button onClick={() => setAuthOpen(true)} className="bg-orange-500 hover:bg-orange-600 transition text-white py-2 px-4 rounded-full text-sm font-medium">
              Login / Sign Up
            </button>
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;