const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================================
// GET LOGGED-IN USER'S CART
// ==========================================
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    // If the user does not have a cart yet,
    // create an empty cart for them
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Server error while fetching cart",
      error: error.message,
    });
  }
};


// ==========================================
// ADD PRODUCT TO CART
// ==========================================
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product ID
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // Make sure the quantity is valid
    const requestedQuantity = Number(quantity) || 1;

    if (requestedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    // Check that the product actually exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find the user's cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // If the user doesn't have a cart, create one
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity: requestedQuantity,
          },
        ],
      });
    } else {
      // Check whether product already exists in cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId.toString()
      );

      if (existingItem) {
        // Product already exists → increase quantity
        existingItem.quantity += requestedQuantity;
      } else {
        // Product doesn't exist → add new item
        cart.items.push({
          product: productId,
          quantity: requestedQuantity,
        });
      }

      await cart.save();
    }

    // Return cart with product information
    await cart.populate("items.product");

    res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    res.status(500).json({
      message: "Server error while adding product to cart",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        message: "Product ID and quantity are required",
      });
    }

    const newQuantity = Number(quantity);

    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a whole number greater than 0",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    // Find the item
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Product is not in the cart",
      });
    }

    // Update quantity
    cartItem.quantity = newQuantity;

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      message: "Cart item updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Update cart error:", error);

    res.status(500).json({
      message: "Server error while updating cart",
      error: error.message,
    });
  }
};


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // Find the user's cart
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemExists = cart.items.some(
      (item) => item.product.toString() === productId.toString()
    );

    if (!itemExists) {
      return res.status(404).json({
        message: "Product is not in the cart",
      });
    }

    // Remove the item
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);

    res.status(500).json({
      message: "Server error while removing product from cart",
      error: error.message,
    });
  }
};


// ==========================================
// CLEAR CART
// ==========================================
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      message: "Server error while clearing cart",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};