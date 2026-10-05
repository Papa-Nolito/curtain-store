import white from "../assets/images/products/white.jpg";
import red from "../assets/images/products/red.jpg";
import blue from "../assets/images/products/blue.jpg";
import grey from "../assets/images/products/grey.jpg";
import checked from "../assets/images/products/checked.jpg";
import  pure from "../assets/images/products/pure.jpg";
import golden from "../assets/images/products/golden.jpg";
import jungle from "../assets/images/products/jungle.jpg";

const products = [
  {
    id: 1,
    name: "Luxury White Curtain",
    description:
      "Premium blackout curtain perfect for bedrooms.",
    category: "Bedroom",
    price: 45,
    oldPrice: 60,
    rating: 5,
    reviews: 124,
    badge: "NEW",
    image: white,
  },

  {
    id: 2,
    name: "Red Sheer Curtain",
    description:
      "Elegant sheer curtain for bright living rooms.",
    category: "Living Room",
    price: 55,
    oldPrice: 70,
    rating: 4,
    reviews: 82,
    badge: "SALE",
    image: red,
  },

  {
    id: 3,
    name: "Velvet Blue Curtain",
    description:
      "Luxury velvet curtain ideal for modern bedrooms.",
    category: "Bedroom",
    price: 70,
    oldPrice: 90,
    rating: 5,
    reviews: 210,
    badge: "HOT",
    image: blue,
  },

  {
    id: 4,
    name: "Office Grey Curtain",
    description:
      "Professional curtain suitable for office spaces.",
    category: "Office",
    price: 65,
    oldPrice: 80,
    rating: 4,
    reviews: 95,
    badge: "NEW",
    image: grey,
  },

  {
    id: 5,
    name: "Luxury Hotel Curtain",
    description:
      "Heavy blackout curtain designed for hotels.",
    category: "Hotel",
    price: 95,
    oldPrice: 120,
    rating: 5,
    reviews: 188,
    badge: "BEST",
    image: checked,
  },

  {
    id: 6,
    name: "Modern White Curtain",
    description:
      "Minimalist white curtain for modern interiors.",
    category: "Living Room",
    price: 58,
    oldPrice: 75,
    rating: 4,
    reviews: 140,
    badge: "NEW",
    image: pure,
  },

  {
    id: 7,
    name: "Executive Office Curtain",
    description:
      "Premium office curtain with elegant finish.",
    category: "Office",
    price: 85,
    oldPrice: 100,
    rating: 5,
    reviews: 75,
    badge: "HOT",
    image: jungle,
  },

  {
    id: 8,
    name: "Royal Hotel Curtain",
    description:
      "Premium velvet curtain for luxury hotels.",
    category: "Hotel",
    price: 120,
    oldPrice: 150,
    rating: 5,
    reviews: 250,
    badge: "BEST",
    image: golden,
  }
];

export default products;