require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/Product");

const connectDB = require("../config/db");


// Existing curtain products

const products = [
    {
        name: "Luxury White Curtain",
        description:
            "Premium blackout curtain perfect for bedrooms.",
        category: "Bedroom",
        price: 45,
        oldPrice: 60,
        rating: 5,
        reviews: 124,
        badge: "NEW",
        image: "/images/products/white.jpg"
    },

    {
        name: "Red Sheer Curtain",
        description:
            "Elegant sheer curtain for bright living rooms.",
        category: "Living Room",
        price: 55,
        oldPrice: 70,
        rating: 4,
        reviews: 82,
        badge: "SALE",
        image: "/images/products/red.jpg"
    },

    {
        name: "Velvet Blue Curtain",
        description:
            "Luxury velvet curtain ideal for modern bedrooms.",
        category: "Bedroom",
        price: 70,
        oldPrice: 90,
        rating: 5,
        reviews: 210,
        badge: "HOT",
        image: "/images/products/blue.jpg"
    },

    {
        name: "Office Grey Curtain",
        description:
            "Professional curtain suitable for office spaces.",
        category: "Office",
        price: 65,
        oldPrice: 80,
        rating: 4,
        reviews: 95,
        badge: "NEW",
        image: "/images/products/grey.jpg"
    },

    {
        name: "Luxury Hotel Curtain",
        description:
            "Heavy blackout curtain designed for hotels.",
        category: "Hotel",
        price: 95,
        oldPrice: 120,
        rating: 5,
        reviews: 188,
        badge: "BEST",
        image: "/images/products/checked.jpg"
    },

    {
        name: "Modern White Curtain",
        description:
            "Minimalist white curtain for modern interiors.",
        category: "Living Room",
        price: 58,
        oldPrice: 75,
        rating: 4,
        reviews: 140,
        badge: "NEW",
        image: "/images/products/pure.jpg"
    },

    {
        name: "Executive Office Curtain",
        description:
            "Premium office curtain with elegant finish.",
        category: "Office",
        price: 85,
        oldPrice: 100,
        rating: 5,
        reviews: 75,
        badge: "HOT",
        image: "/images/products/jungle.jpg"
    },

    {
        name: "Royal Hotel Curtain",
        description:
            "Premium velvet curtain for luxury hotels.",
        category: "Hotel",
        price: 120,
        oldPrice: 150,
        rating: 5,
        reviews: 250,
        badge: "BEST",
        image: "/images/products/golden.jpg"
    }
];


// Seed database

const seedProducts = async () => {

    try {

        // Connect to MongoDB

        await connectDB();

        console.log("Connected to MongoDB");


        // Remove existing products

        await Product.deleteMany();

        console.log("Existing products removed");


        // Insert products

        await Product.insertMany(products);

        console.log("8 curtain products inserted successfully");


        // Close database connection

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

        process.exit(0);

    } catch (error) {

        console.error("Error seeding products:");

        console.error(error);

        await mongoose.connection.close();

        process.exit(1);

    }

};


// Run seed function

seedProducts();