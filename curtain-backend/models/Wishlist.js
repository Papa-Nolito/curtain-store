const mongoose = require("mongoose");


// =====================================================
// WISHLIST SCHEMA
// =====================================================

const wishlistSchema = new mongoose.Schema(
    {
        // =================================================
        // USER
        // =================================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },


        // =================================================
        // WISHLIST PRODUCTS
        // =================================================

        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },


    // =====================================================
    // TIMESTAMPS
    // =====================================================

    {
        timestamps: true,
    }
);


// =====================================================
// EXPORT MODEL
// =====================================================

module.exports = mongoose.model(
    "Wishlist",
    wishlistSchema
);