import React from "react";
import MenuCard from "../layouts/MenuCard";

const dishes = [
  {
    id: 1,
    name: "Chicken Burger",
    price: "599",
    tag: "Hot",
    image: "src/assets/img/menu1.png",
  },
  {
    id: 2,
    name: "Peri Peri Pizza",
    price: "849",
    tag: "New",
    image: "src/assets/img/menu2.png",
  },
  {
    id: 3,
    name: "Sushi Deluxe",
    price: "625",
    tag: "",
    image: "src/assets/img/menu3.png",
  },
  {
    id: 4,
    name: "Paneer Poppers",
    price: "780",
    tag: "Hot",
    image: "src/assets/img/menu4.png",
  },
  {
    id: 5,
    name: "Club Sandwich",
    price: "320",
    tag: "",
    image: "src/assets/img/menu5.png",
  },
  {
    id: 6,
    name: "Mocktail Mojito",
    price: "475",
    tag: "New",
    image: "src/assets/img/menu6.png",
  },
  {
    id: 7,
    name: "Nacho Fiesta",
    price: "780",
    tag: "Hot",
    image: "src/assets/img/menu7.png",
  },
  {
    id: 8,
    name: "Biryani Bowl",
    price: "320",
    tag: "",
    image: "src/assets/img/menu8.png",
  },
];  

const Menu = () => {
  return (
    <section id="foods" className="bg-white dark:bg-black text-black dark:text-white py-16 px-5 lg:px-14 transition-colors duration-300">
      <div className="text-center mb-12">
        <p className="text-orange-500 font-medium uppercase tracking-wider mb-2">
          Our Menu
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">Top Picks For You</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {dishes.map((dish) => (
          <MenuCard key={dish.id} {...dish} /> // JS This is Spread Operator or in react props spread syntax
        ))}
      </div>
    </section>
  );
};

export default Menu;