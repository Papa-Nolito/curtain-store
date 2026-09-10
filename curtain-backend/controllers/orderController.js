const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================================
// CREATE NEW ORDER
// ==========================================

const createOrder = async (req, res) => {
    try {
        const {
            shippingAddress,
            paymentMethod,
        } = req.body;

        // ==========================================
        // VALIDATE SHIPPING ADDRESS
        // ==========================================

        if (
            !shippingAddress ||
            !shippingAddress.fullName ||
            !shippingAddress.phone ||
            !shippingAddress.address ||
            !shippingAddress.city
        ) {
            return res.status(400).json({
                message:
                    "Please provide all required shipping information",
            });
        }

        // ==========================================
        // GET USER'S CART
        // ==========================================

        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        // ==========================================
        // CHECK CART
        // ==========================================

        if (
            !cart ||
            !cart.items ||
            cart.items.length === 0
        ) {
            return res.status(400).json({
                message: "Your cart is empty",
            });
        }

        // ==========================================
        // BUILD ORDER ITEMS
        // ==========================================

        const orderItems = [];

        for (const item of cart.items) {
            // Make sure the product still exists
            if (!item.product) {
                return res.status(400).json({
                    message:
                        "One of the products in your cart is no longer available",
                });
            }

            // Validate quantity
            if (
                !Number.isInteger(item.quantity) ||
                item.quantity < 1
            ) {
                return res.status(400).json({
                    message:
                        "Invalid product quantity in cart",
                });
            }

            orderItems.push({
                product: item.product._id,
                name: item.product.name,
                image: item.product.image,
                price: item.product.price,
                quantity: item.quantity,
            });
        }

        // ==========================================
        // CALCULATE TOTAL ON SERVER
        // ==========================================

        const totalAmount = orderItems.reduce(
            (total, item) =>
                total +
                item.price * item.quantity,
            0
        );

        // ==========================================
        // CREATE ORDER
        // ==========================================

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress: {
                fullName:
                    shippingAddress.fullName.trim(),
                phone:
                    shippingAddress.phone.trim(),
                address:
                    shippingAddress.address.trim(),
                city:
                    shippingAddress.city.trim(),
            },
            totalAmount,
            paymentMethod:
                paymentMethod || "Cash on Delivery",
            paymentStatus: "Pending",
            orderStatus: "Pending",
        });

        // ==========================================
        // CLEAR CART AFTER ORDER CREATION
        // ==========================================

        cart.items = [];
        await cart.save();

        // ==========================================
        // RETURN CREATED ORDER
        // ==========================================

        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        console.error(
            "Create order error:",
            error
        );

        res.status(500).json({
            message:
                "Server error while creating order",
            error: error.message,
        });
    }
};

// ==========================================
// GET LOGGED-IN USER'S ORDERS
// ==========================================

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: orders.length,
            orders,
        });
    } catch (error) {
        console.error(
            "Get my orders error:",
            error
        );

        res.status(500).json({
            message:
                "Server error while fetching orders",
            error: error.message,
        });
    }
};

// ==========================================
// GET ONE ORDER
// ==========================================

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id,
        })
            .populate("items.product")
            .populate("user", "name email");

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(200).json({
            order,
        });
    } catch (error) {
        console.error(
            "Get order error:",
            error
        );

        if (error.name === "CastError") {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(500).json({
            message:
                "Server error while fetching order",
            error: error.message,
        });
    }
};

// ==========================================
// SIMULATE PAYMENT
// ==========================================

const simulatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { paymentMethod } = req.body;

        // ==========================================
        // VALIDATE PAYMENT METHOD
        // ==========================================

        const allowedMethods = [
            "Cash on Delivery",
            "Card Payment",
            "M-Pesa",
        ];

        if (
            !paymentMethod ||
            !allowedMethods.includes(paymentMethod)
        ) {
            return res.status(400).json({
                message:
                    "Please select a valid payment method",
            });
        }

        // ==========================================
        // FIND ORDER
        // ==========================================

        const order =
            await Order.findOne({
                _id: id,
                user: req.user._id,
            });

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        // ==========================================
        // CHECK PAYMENT STATUS
        // ==========================================

        if (
            order.paymentStatus === "Paid"
        ) {
            return res.status(400).json({
                message:
                    "This order has already been paid",
            });
        }

        // ==========================================
        // UPDATE PAYMENT INFORMATION
        // ==========================================

        order.paymentMethod =
            paymentMethod;

        order.paymentStatus =
            "Paid";

        order.orderStatus =
            "Processing";

        await order.save();

        // ==========================================
        // RETURN UPDATED ORDER
        // ==========================================

        res.status(200).json({
            message:
                "Payment completed successfully",
            order,
        });
    } catch (error) {
        console.error(
            "Simulate payment error:",
            error
        );

        if (
            error.name === "CastError"
        ) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(500).json({
            message:
                "Server error while processing payment",
            error: error.message,
        });
    }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    simulatePayment,
};

