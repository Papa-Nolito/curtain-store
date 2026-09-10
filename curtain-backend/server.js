require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const authRoutes = require("./routes/authRoutes");

const orderRoutes = require("./routes/orderRoutes");

const cartRoutes = require("./routes/cartRoutes");

const wishlistRoutes = require("./routes/wishlistRoutes");

const app = express();


// ========================================
// CONNECT TO MONGODB
// ========================================

connectDB();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());


// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.json({

        message: "Curtain Store API is running"

    });

});


// ========================================
// PRODUCT ROUTES
// ========================================

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/cart",
     cartRoutes
    );

app.use(
    "/api/wishlist",
     wishlistRoutes
    );

// ========================================
// AUTH ROUTES
// ========================================

app.use(
    "/api/auth",
    authRoutes
);



// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 5000;

app.get("/api/auth/test", (req, res) => {
    res.json({
        message: "Auth routes are working"
    });
});

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});