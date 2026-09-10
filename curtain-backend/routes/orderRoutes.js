const express = require("express");
const router = express.Router();


const {
    createOrder,
    getMyOrders,
    getOrderById,
    simulatePayment,
} = require("../controllers/orderController");


const protect =
    require("../middleware/authMiddleware");


// =====================================================
// CREATE ORDER
// =====================================================

router.post(
    "/",
    protect,
    createOrder
);


// =====================================================
// GET MY ORDERS
// =====================================================

router.get(
    "/",
    protect,
    getMyOrders
);


// =====================================================
// GET SINGLE ORDER
// =====================================================

router.get(
    "/:id",
    protect,
    getOrderById
);


// =====================================================
// SIMULATE PAYMENT
// =====================================================

router.put(
    "/:id/pay",
    protect,
    simulatePayment
);


module.exports = router;