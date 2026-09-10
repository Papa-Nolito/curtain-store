const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");


// ==========================================
// GET USER'S CART
// ==========================================
router.get("/", protect, getCart);


// ==========================================
// ADD PRODUCT TO CART
// ==========================================
router.post("/add", protect, addToCart);


// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================
router.put("/update", protect, updateCartItem);


// ==========================================
// REMOVE PRODUCT FROM CART
// ==========================================
router.delete("/remove/:productId", protect, removeFromCart);


// ==========================================
// CLEAR CART
// ==========================================
router.delete("/clear", protect, clearCart);


module.exports = router;