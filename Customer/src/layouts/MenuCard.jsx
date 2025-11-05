import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatCurrency, parsePrice } from "../utils/format";

const MenuCard = ({ id, name, price, tag, image, onOpen }) => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  // create a stable, DOM-safe id for the menu card using the name
  const slugify = (text = "") =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  const elementId = `menu-${slugify(name)}`;

  const handleAdd = () => {
    // require login before adding to cart
    if (!user) {
      // ask the navbar to open the Auth modal
      if (typeof window !== "undefined" && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent("openAuthModal"));
      }
      return;
    }

    const numericPrice = parsePrice(price);
    addItem({ id, name, price: numericPrice });
    // trigger temporary visual feedback on the button
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 900);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    // make the whole card tappable on mobile/tablet; clicking the Add button stops propagation
    <div
      id={elementId}
      onClick={() => onOpen && onOpen()}
      className="group bg-gray-100 dark:bg-[#1F1D2B] p-6 rounded-2xl hover:bg-sky-900 dark:hover:bg-orange-500 transition-all duration-300 cursor-pointer"
    >
      <div className="relative mb-4">
        <img src={image} alt={name} className="mx-auto max-h-40 md:max-h-56 object-contain" />
        {tag && (
          <span className="absolute -top-3.5 -left-4 bg-orange-500 text-white group-hover:bg-black text-xs px-2 py-1 rounded-md">
            {tag}
          </span>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">
        {name}
      </h3>
      <p className="text-lg font-bold text-orange-500 group-hover:text-white transition-colors duration-300">
        {formatCurrency(parsePrice(price))}
      </p>
      <div className="mt-4">
        <button
          onClick={(e) => { e.stopPropagation(); handleAdd(); }}
          className={"w-full text-white py-2 rounded transition-all duration-200 " + (added ? "dance shadow-lg bg-green-500" : "bg-orange-500")}
          aria-pressed={added}
        >
          {added ? "Added \u2713" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;