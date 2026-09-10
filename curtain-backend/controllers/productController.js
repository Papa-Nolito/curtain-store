const Product = require("../models/Product");


// ========================================
// GET all products
// ========================================

const getProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch products",
            error: error.message
        });

    }

};


// ========================================
// GET one product
// ========================================

const getProductById = async (req, res) => {

    try {

        const product = await Product.findById(
            req.params.id
        );

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch product",
            error: error.message
        });

    }

};


// ========================================
// CREATE product
// POST /api/products
// ========================================

const createProduct = async (req, res) => {

    try {

        const product = new Product(req.body);

        const savedProduct = await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product: savedProduct
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to create product",
            error: error.message
        });

    }

};


// ========================================
// UPDATE product
// PUT /api/products/:id
// ========================================

const updateProduct = async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {

        res.status(400).json({
            message: "Failed to update product",
            error: error.message
        });

    }

};


// ========================================
// DELETE product
// DELETE /api/products/:id
// ========================================

const deleteProduct = async (req, res) => {

    try {

        const deletedProduct = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({
            message: "Product deleted successfully",
            product: deletedProduct
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete product",
            error: error.message
        });

    }

};


// ========================================
// Export controllers
// ========================================

module.exports = {

    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

};