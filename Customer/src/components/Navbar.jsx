import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import OrderHistory from "./OrderHistory";

const Navbar = () => {
  const { items, toggleCart } = useCart();
  const { user, username, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const count = items.reduce((s, it) => s + it.quantity, 0);

  React.useEffect(() => {
    const handler = () => setAuthOpen(true);
    window.addEventListener("openAuthModal", handler);
    return () => window.removeEventListener("openAuthModal", handler);
  }, []);

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
  <header className="fixed top-0 left-0 right-0 z-60 bg-white/90 dark:bg-[#0b1220]/90 text-black dark:text-white py-3 px-3 sm:px-5 lg:px-14 flex items-center justify-between shadow-sm transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-orange-500">
        <Logo size={28} />
        <span>FlavourFlow</span>
      </div>

      {/* Nav Links (desktop) */}
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

      {/* Mobile hamburger */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMobileOpen((s) => !s)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Cart & Button */}
      <div className="flex items-center space-x-4">
        <ThemeToggle /> 
        <button onClick={toggleCart} className="relative text-orange-400 text-xl">
          <FaShoppingCart />
          {count > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{count}</span>}
        </button>
        {user ? (
          <div className="flex items-center gap-2">
            <button onClick={() => setOrdersOpen(true)} className="text-sm px-3 py-1">{username ? `Hi, ${username}` : user.email}</button>
            <button onClick={() => setOrdersOpen(true)} className="bg-orange-100 text-orange-600 hover:bg-orange-200 py-1 px-3 rounded">My Orders</button>
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Logout</button>
          </div>
        ) : (
          <>
            {/* hide top login button when mobile menu is open (mobile menu contains its own login) */}
            {!mobileOpen && (
              // hide this primary auth CTA on small and medium screens so only the hamburger menu is visible there
              <button onClick={() => setAuthOpen(true)} className="hidden lg:inline-flex bg-orange-500 hover:bg-orange-600 transition text-white py-2 px-4 rounded-full text-sm font-medium">
                Login / Sign Up
              </button>
            )}
            <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
          </>
        )}
      </div>

      <OrderHistory open={ordersOpen} onClose={() => setOrdersOpen(false)} />

  {/* listen for global requests to open auth modal (e.g., from other components) */}
  {/* attach listener imperatively so it's available whenever the NAV mounts */}

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-[#0b1220]/95 backdrop-blur-sm z-50 shadow-md">
          <nav className="flex flex-col p-4 space-y-3 font-medium">
            <a onClick={(e) => { setMobileOpen(false); handleScroll(e, ""); }} href="/" className="hover:text-orange-400 transition">Home</a>
            <a onClick={(e) => { setMobileOpen(false); handleScroll(e, "foods"); }} href="#foods" className="hover:text-orange-400 transition">Foods</a>
            <a onClick={(e) => { setMobileOpen(false); handleScroll(e, ""); }} href="/" className="hover:text-orange-400 transition">Offers</a>
            <a onClick={(e) => { setMobileOpen(false); handleScroll(e, "service"); }} href="#service" className="hover:text-orange-400 transition">Service</a>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
              {user ? (
                <div className="flex flex-col gap-2 mt-2">
                  <button className="text-left px-2">{username ? `Hi, ${username}` : user.email}</button>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <button onClick={() => { setAuthOpen(true); setMobileOpen(false); }} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded">Login / Sign Up</button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;