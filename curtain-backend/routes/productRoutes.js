const express = require("express");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();


// ========================================
// GET all products
// GET /api/products
// ========================================

router.get(
    "/",
    getProducts
);


// ========================================
// GET one product
// GET /api/products/:id
// ========================================

router.get(
    "/:id",
    getProductById
);


// ========================================
// CREATE product
// POST /api/products
// ========================================

router.post(
    "/",
    createProduct
);


// ========================================
// UPDATE product
// PUT /api/products/:id
// ========================================

router.put(
    "/:id",
    updateProduct
);


// ========================================
// DELETE product
// DELETE /api/products/:id
// ========================================

router.delete(
    "/:id",
    deleteProduct
);


module.exports = router;