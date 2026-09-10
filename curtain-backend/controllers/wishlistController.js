const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");


// =====================================================
// GET LOGGED-IN USER'S WISHLIST
// =====================================================

const getWishlist = async (req, res) => {

    try {

        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        }).populate("products");


        // =================================================
        // CREATE WISHLIST IF USER DOESN'T HAVE ONE
        // =================================================

        if (!wishlist) {

            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [],
            });
        }


        // =================================================
        // RETURN WISHLIST
        // =================================================

        res.status(200).json({
            wishlist,
        });

    } catch (error) {

        console.error(
            "Get wishlist error:",
            error
        );

        res.status(500).json({
            message: "Server error while fetching wishlist",
            error: error.message,
        });
    }
};


// =====================================================
// ADD PRODUCT TO WISHLIST
// =====================================================

const addToWishlist = async (req, res) => {

    try {

        const { productId } = req.body;


        // =================================================
        // VALIDATE PRODUCT ID
        // =================================================

        if (!productId) {

            return res.status(400).json({
                message: "Product ID is required",
            });
        }


        // =================================================
        // CHECK PRODUCT EXISTS
        // =================================================

        const product = await Product.findById(productId);


        if (!product) {

            return res.status(404).json({
                message: "Product not found",
            });
        }


        // =================================================
        // FIND USER'S WISHLIST
        // =================================================

        let wishlist = await Wishlist.findOne({
            user: req.user._id,
        });


        // =================================================
        // CREATE WISHLIST IF IT DOESN'T EXIST
        // =================================================

        if (!wishlist) {

            wishlist = await Wishlist.create({
                user: req.user._id,
                products: [productId],
            });

        } else {

            // =============================================
            // CHECK WHETHER PRODUCT IS ALREADY ADDED
            // =============================================

            const alreadyExists = wishlist.products.some(
                (item) =>
                    item.toString() === productId.toString()
            );


            if (alreadyExists) {

                return res.status(400).json({
                    message: "Product is already in your wishlist",
                });
            }


            // =============================================
            // ADD PRODUCT
            // =============================================

            wishlist.products.push(productId);

            await wishlist.save();
        }


        // =================================================
        // POPULATE PRODUCTS
        // =================================================

        await wishlist.populate("products");


        // =================================================
        // RETURN UPDATED WISHLIST
        // =================================================

        res.status(200).json({
            message: "Product added to wishlist successfully",
            wishlist,
        });

    } catch (error) {

        console.error(
            "Add to wishlist error:",
            error
        );

        res.status(500).json({
            message: "Server error while adding product to wishlist",
            error: error.message,
        });
    }
};


// =====================================================
// REMOVE PRODUCT FROM WISHLIST
// =====================================================

const removeFromWishlist = async (req, res) => {

    try {

        const { productId } = req.params;


        // =================================================
        // VALIDATE PRODUCT ID
        // =================================================

        if (!productId) {

            return res.status(400).json({
                message: "Product ID is required",
            });
        }


        // =================================================
        // FIND USER'S WISHLIST
        // =================================================

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });


        if (!wishlist) {

            return res.status(404).json({
                message: "Wishlist not found",
            });
        }


        // =================================================
        // CHECK PRODUCT EXISTS IN WISHLIST
        // =================================================

        const itemExists = wishlist.products.some(
            (item) =>
                item.toString() === productId.toString()
        );


        if (!itemExists) {

            return res.status(404).json({
                message: "Product is not in the wishlist",
            });
        }


        // =================================================
        // REMOVE PRODUCT
        // =================================================

        wishlist.products = wishlist.products.filter(
            (item) =>
                item.toString() !== productId.toString()
        );


        await wishlist.save();


        // =================================================
        // POPULATE PRODUCTS
        // =================================================

        await wishlist.populate("products");


        // =================================================
        // RETURN UPDATED WISHLIST
        // =================================================

        res.status(200).json({
            message: "Product removed from wishlist successfully",
            wishlist,
        });

    } catch (error) {

        console.error(
            "Remove from wishlist error:",
            error
        );

        res.status(500).json({
            message: "Server error while removing product from wishlist",
            error: error.message,
        });
    }
};


// =====================================================
// CLEAR WISHLIST
// =====================================================

const clearWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.findOne({
            user: req.user._id,
        });


        if (!wishlist) {

            return res.status(404).json({
                message: "Wishlist not found",
            });
        }


        // =================================================
        // REMOVE ALL PRODUCTS
        // =================================================

        wishlist.products = [];

        await wishlist.save();


        // =================================================
        // RETURN EMPTY WISHLIST
        // =================================================

        res.status(200).json({
            message: "Wishlist cleared successfully",
            wishlist,
        });

    } catch (error) {

        console.error(
            "Clear wishlist error:",
            error
        );

        res.status(500).json({
            message: "Server error while clearing wishlist",
            error: error.message,
        });
    }
};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
};