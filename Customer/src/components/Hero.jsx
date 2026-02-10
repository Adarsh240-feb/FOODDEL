import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";
import { GiFoodTruck } from "react-icons/gi";
import { BsCartCheckFill } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import img from "../assets/img/Hero.jpg";

const Hero = () => {
  const [query, setQuery] = useState("");
  const [searchMsg, setSearchMsg] = useState("");
  const scrollTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
        scrollTimerRef.current = null;
      }
    };
  }, []);

  const slugify = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleFind = () => {
    const q = query.trim();
    if (!q) {
      // if empty, scroll to foods section
      const foods = document.getElementById("foods");
      if (foods) foods.scrollIntoView({ behavior: "smooth", block: "start" });
      setSearchMsg("");
      return;
    }

    const slug = slugify(q);
    // try exact id match first
    let el = document.getElementById(`menu-${slug}`);

    // fallback: look for partial matches inside menu cards
    if (!el) {
      const cards = document.querySelectorAll('[id^="menu-"]');
      const qLower = q.toLowerCase();
      for (const c of cards) {
        const title = c.querySelector("h3")?.textContent?.toLowerCase() || "";
        if (title.includes(qLower)) {
          el = c;
          break;
        }
      }
    }

    if (el) {
      setSearchMsg(`Found "${q}" — scrolling to item.`);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        scrollTimerRef.current = null;
      }, 2000);
    } else {
      setSearchMsg(`No match for "${q}". Showing full menu in 2s.`);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        const foods = document.getElementById("foods");
        if (foods) foods.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollTimerRef.current = null;
      }, 2000);
    }
  };

  const AuthGreeting = () => {
    const { username } = useAuth();
    // always show stacked greeting: 'hello' above the name (fallback to 'adarsh')
    return (
      <div className="absolute top-6 left-6 z-20">
        {/* transparent wrapper with adaptive padding so spacing follows the child size */}
        <div className="inline-flex items-start bg-transparent px-2 py-1 md:px-3 md:py-2">
          <div className="flex flex-col items-start gap-2 md:gap-5">
            <span className="text-lg md:text-3xl font-semibold text-orange-500 tracking-wide leading-none">Hello,</span>
            <span
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-orange-500 tracking-tight leading-none mt-1 md:mt-2 whitespace-nowrap"
              style={{ display: "inline-block", transform: "scaleY(1.18)" }}
            >
              {username || 'User'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative bg-white dark:bg-black text-black dark:text-white min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center md:justify-between px-5 lg:px-14 gap-8 pt-5 md:pt-0 transition-colors duration-300">
  {/* greeting for logged-in user (placed above the People trust us block) */}
      {/* Left Content */}
      <div className="lg:w-1/2 w-full text-center lg:text-left">
        {/* Greeting placed here to occupy space above the intro */}
        <AuthGreeting />

        <div className="inline-flex items-center mb-4 text-orange-400 font-medium">
          <FaLeaf className="mr-2" /> People trust us
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Most <span className="text-orange-500">Fastest</span> Food
          <br /> <span className="text-orange-500">Delivery</span> Service
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Enter your location to get your nearest restaurants or get deliver
          foods & enjoy. Happy foodie life
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center bg-white rounded-full px-4 py-2 text-black w-full sm:w-auto">
            <FaMapMarkerAlt className="text-orange-500 mr-2" />
            <input
              type="text"
              placeholder="Search foods (e.g. Biryani)"
              className="outline-none w-full bg-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFind();
              }}
            />
          </div>

          <button onClick={handleFind} className="bg-orange-500 hover:bg-orange-600 transition text-white font-semibold rounded-full px-6 py-2">
            Find Foods
          </button>
        </div>

        {searchMsg && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{searchMsg}</p>
        )}
        
      </div>

      {/* Right Content */}
      <div className="lg:w-1/2 w-full relative flex justify-center mb-10 lg:mb-0">
        <div className="relative">
          <img
            src={img}
            alt="Delivery Guy"
            className="rounded-full w-[350px] h-[350px] md:w-[400px] md:h-[400px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-8 right-0 md:right-10 bg-white text-black text-sm px-3 py-1 rounded-full flex items-center shadow-lg">
          <GiFoodTruck className="text-orange-500 mr-2" /> Quality Food
        </div>

        <div className="absolute bottom-10 left-0 md:left-12 bg-white text-black text-sm px-3 py-1 rounded-full flex items-center shadow-lg">
          <BsCartCheckFill className="text-green-500 mr-2" /> Easy to Order
        </div>

        <div className="absolute bottom-6 right-0 md:right-10 bg-white text-black text-sm px-3 py-1 rounded-full flex items-center shadow-lg">
          <MdDeliveryDining className="text-blue-500 mr-2" /> Fastest Delivery
        </div>
      </div>
    </section>
  );
};

export default Hero;