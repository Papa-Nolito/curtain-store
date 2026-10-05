import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import {
    getOrderById,
    simulatePayment,
} from "../services/orderService";

import {
    useAuth,
} from "../context/AuthContext";

import "../styles/Payment.css";


function Payment() {

    const navigate = useNavigate();

    const [searchParams] =
        useSearchParams();

    const orderId =
        searchParams.get("orderId");

    const {
        user,
        loading: authLoading,
    } = useAuth();

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [paymentLoading, setPaymentLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [paymentMethod, setPaymentMethod] =
        useState("Cash on Delivery");


    // =====================================================
    // LOAD ORDER
    // =====================================================

    useEffect(() => {

        if (authLoading) {
            return;
        }

        async function loadOrder() {

            try {

                setLoading(true);
                setError("");

                if (!user) {
                    navigate("/login");
                    return;
                }

                if (!orderId) {

                    setError(
                        "Order ID is missing."
                    );

                    setLoading(false);

                    return;
                }

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                console.log(
                    "Payment page orderId:",
                    orderId
                );

                const orderData =
                    await getOrderById(
                        token,
                        orderId
                    );

                setOrder(orderData);

                if (orderData.paymentMethod) {

                    setPaymentMethod(
                        orderData.paymentMethod
                    );
                }

            } catch (error) {

                console.error(
                    "Load order error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load order."
                );

            } finally {

                setLoading(false);

            }
        }

        loadOrder();

    }, [
        orderId,
        user,
        authLoading,
        navigate,
    ]);


    // =====================================================
    // COMPLETE PAYMENT
    // =====================================================

    const completePayment = async () => {

        try {

            setError("");

            if (!order) {

                setError(
                    "Order information is not available."
                );

                return;
            }

            if (!user) {

                navigate("/login");

                return;
            }

            const token =
                localStorage.getItem("token");

            if (!token) {

                navigate("/login");

                return;
            }

            if (!paymentMethod) {

                setError(
                    "Please select a payment method."
                );

                return;
            }

            const cleanedPaymentMethod =
                String(
                    paymentMethod
                ).trim();

            console.log(
                "Frontend payment method:",
                paymentMethod
            );

            console.log(
                "Frontend payment method type:",
                typeof paymentMethod
            );

            console.log(
                "Cleaned payment method:",
                cleanedPaymentMethod
            );

            console.log(
                "Payment orderId:",
                orderId
            );

            setPaymentLoading(true);

            const updatedOrder =
                await simulatePayment(
                    token,
                    orderId,
                    cleanedPaymentMethod
                );

            console.log(
                "Payment successful:",
                updatedOrder
            );

            localStorage.removeItem(
                "checkoutCustomer"
            );

            localStorage.removeItem(
                "currentOrderId"
            );

            navigate(
                `/order-confirmation/${updatedOrder._id}`
            );

        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            setError(
                error.message ||
                "Unable to process payment."
            );

        } finally {

            setPaymentLoading(false);

        }
    };


    // =====================================================
    // LOADING STATE
    // =====================================================

    if (
        loading ||
        authLoading
    ) {

        return (

            <div className="payment-page">

                <div className="payment-card">

                    <h1>
                        Loading Payment...
                    </h1>

                    <p>
                        Please wait while we retrieve
                        your order.
                    </p>

                </div>

            </div>

        );
    }


    // =====================================================
    // ERROR STATE
    // =====================================================

    if (
        error &&
        !order
    ) {

        return (

            <div className="payment-page">

                <div className="payment-card">

                    <h1>
                        Unable to Load Payment
                    </h1>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Return to Products
                    </button>

                </div>

            </div>

        );
    }


    // =====================================================
    // ORDER NOT FOUND
    // =====================================================

    if (!order) {

        return (

            <div className="payment-page">

                <div className="payment-card">

                    <h1>
                        Order Not Found
                    </h1>

                    <p>
                        We could not find this order.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Return to Products
                    </button>

                </div>

            </div>

        );
    }


    // =====================================================
    // FORMAT TOTAL
    // =====================================================

    const formattedTotal =
        Number(
            order.totalAmount || 0
        ).toLocaleString();


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="payment-page page-animation">

            <h1>
                Payment
            </h1>


            <div className="payment-card">

                {/* =========================================
                    ORDER SUMMARY
                ========================================== */}

                <h2>
                    Order Summary
                </h2>


                <div className="order-summary">

                    <p>
                        Order ID:{" "}
                        <strong>
                            {order._id}
                        </strong>
                    </p>

                    <p>
                        Items:{" "}
                        {order.items?.length || 0}
                    </p>

                    <p>
                        Order Status:{" "}
                        {order.orderStatus}
                    </p>

                    <p>
                        Payment Status:{" "}
                        {order.paymentStatus}
                    </p>

                    <h3>
                        Total: Ksh{" "}
                        {formattedTotal}
                    </h3>

                </div>


                {/* =========================================
                    PAYMENT METHODS
                ========================================== */}

                <div className="payment-method">

                    <h3>
                        Payment Method
                    </h3>


                    {/* CASH ON DELIVERY */}

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            checked={
                                paymentMethod ===
                                "Cash on Delivery"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        💵 Cash on Delivery

                    </label>


                    {/* CARD PAYMENT */}

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="Card Payment"
                            checked={
                                paymentMethod ===
                                "Card Payment"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        💳 Card Payment

                    </label>


                    {/* M-PESA */}

                    <label>

                        <input
                            type="radio"
                            name="paymentMethod"
                            value="M-Pesa"
                            checked={
                                paymentMethod ===
                                "M-Pesa"
                            }
                            onChange={(e) =>
                                setPaymentMethod(
                                    e.target.value
                                )
                            }
                        />

                        📱 M-Pesa

                    </label>

                </div>


                {/* =========================================
                    ERROR MESSAGE
                ========================================== */}

                {error && (

                    <div className="payment-error-message">

                        <strong>
                            Unable to Process Payment
                        </strong>

                        <p>
                            {error}
                        </p>

                    </div>

                )}


                {/* =========================================
                    COMPLETE PAYMENT
                ========================================== */}

                <button
                    type="button"
                    onClick={completePayment}
                    disabled={paymentLoading}
                >

                    {paymentLoading
                        ? "Processing Payment..."
                        : "Complete Payment"}

                </button>


                {/* =========================================
                    BACK TO CHECKOUT
                ========================================== */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/checkout")
                    }
                    disabled={paymentLoading}
                >

                    Back to Checkout

                </button>

            </div>

        </div>

    );
}


export default Payment;

