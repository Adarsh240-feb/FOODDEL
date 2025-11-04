import React, { useState } from "react";
import MenuCard from "../layouts/MenuCard";
import DishModal from "./DishModal";
import dishes from "../data/menuData";

const Menu = () => {
  const [selectedDish, setSelectedDish] = useState(null);

  return (
    <section id="foods" className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300">
      <div className="text-center mb-12">
        <p className="text-orange-500 font-medium uppercase tracking-wider mb-2">
          Our Menu
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">Top Picks For You</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center">
        {dishes.map((dish) => (
          <MenuCard key={dish.id} {...dish} onOpen={() => setSelectedDish(dish)} />
        ))}
      </div>

      <DishModal open={!!selectedDish} dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </section>
  );
};

export default Menu;