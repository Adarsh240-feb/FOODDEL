// Centralized menu data so it can be reused by components and for order persistence
import menu1 from "../assets/img/menu1.png";
import menu2 from "../assets/img/menu2.png";
import menu3 from "../assets/img/menu3.png";
import menu4 from "../assets/img/menu4.png";
import menu5 from "../assets/img/menu5.png";
import menu6 from "../assets/img/menu6.png";
import menu7 from "../assets/img/menu7.png";
import menu8 from "../assets/img/menu8.png";

export const dishes = [
  { id: 1, name: "Chicken Burger", price: 599, tag: "Hot", image: menu1, macros: { calories: 650, protein: 30, carbs: 50, fat: 35 } },
  { id: 2, name: "Peri Peri Pizza", price: 849, tag: "New", image: menu2, macros: { calories: 820, protein: 35, carbs: 90, fat: 30 } },
  { id: 3, name: "Sushi Deluxe", price: 625, tag: "", image: menu3, macros: { calories: 420, protein: 28, carbs: 45, fat: 12 } },
  { id: 4, name: "Paneer Poppers", price: 780, tag: "Hot", image: menu4, macros: { calories: 540, protein: 22, carbs: 30, fat: 32 } },
  { id: 5, name: "Club Sandwich", price: 320, tag: "", image: menu5, macros: { calories: 410, protein: 20, carbs: 35, fat: 18 } },
  { id: 6, name: "Mocktail Mojito", price: 475, tag: "New", image: menu6, macros: { calories: 180, protein: 0, carbs: 28, fat: 0 } },
  { id: 7, name: "Nacho Fiesta", price: 780, tag: "Hot", image: menu7, macros: { calories: 900, protein: 18, carbs: 100, fat: 40 } },
  { id: 8, name: "Biryani Bowl", price: 320, tag: "", image: menu8, macros: { calories: 650, protein: 25, carbs: 80, fat: 22 } },
];

export default dishes;
