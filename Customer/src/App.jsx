import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Process from "./components/Process";
import Menu from "./components/Menu";
import Testimonial from "./components/Testimonial";
import GetApp from "./components/GetApp";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./components/Cart";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
      {/* spacer equal to navbar height to prevent content being hidden under fixed header */}
      <div className="h-16" aria-hidden="true" />
      <Hero />
      <Process />
      <Menu />
      <GetApp />
      <Testimonial />
      <Newsletter />
      <Footer />
        <Cart />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;