import {
    useEffect,
    useState
} from "react";


import {
    useParams,
    Link
} from "react-router-dom";


import {
    getOrderById
} from "../services/orderService";


import {
    useAuth
} from "../context/AuthContext";


import "../styles/OrderConfirmation.css";



function OrderConfirmation() {


    const {
        orderId
    } = useParams();


    const {
        user
    } = useAuth();


    const [order, setOrder] =
        useState(null);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState(null);



    // =====================================================
    // LOAD ORDER
    // =====================================================

    useEffect(() => {


        async function loadOrder() {


            // =============================================
            // CHECK ORDER ID
            // =============================================

            if (!orderId) {

                setError(
                    "Order ID is missing."
                );

                setLoading(false);

                return;

            }


            // =============================================
            // GET TOKEN
            // =============================================

            const token =
                localStorage.getItem(
                    "token"
                );


            if (!token) {

                setError(
                    "You must be logged in to view this order."
                );

                setLoading(false);

                return;

            }


            try {


                // =========================================
                // FETCH ORDER FROM BACKEND
                // =========================================

                const data =
                    await getOrderById(
                        token,
                        orderId
                    );


                setOrder(data);


            } catch (error) {


                console.error(
                    "Order confirmation error:",
                    error
                );


                setError(

                    error.message ||
                    "Unable to load your order."

                );


            } finally {

                setLoading(false);

            }

        }


        loadOrder();


    }, [orderId]);



    // =====================================================
    // LOADING STATE
    // =====================================================

    if (loading) {

        return (

            <div className="confirmation-page">

                <div className="confirmation-card">

                    <h1>
                        Loading Order...
                    </h1>

                    <p>
                        Please wait while we retrieve your order details.
                    </p>

                </div>

            </div>

        );

    }



    // =====================================================
    // ERROR STATE
    // =====================================================

    if (error || !order) {

        return (

            <div className="confirmation-page">

                <div className="confirmation-card">

                    <h1>
                        Order Not Found
                    </h1>


                    <p>

                        {error ||
                            "We could not find this order."}

                    </p>


                    <Link to="/">
                        Return Home
                    </Link>

                </div>

            </div>

        );

    }



    // =====================================================
    // FORMAT DATE
    // =====================================================

    const orderDate =
        order.createdAt
            ? new Date(
                order.createdAt
            ).toLocaleDateString(
                "en-KE",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            )
            : "N/A";



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

        <div className="confirmation-page page-animation">


            <div className="confirmation-card">


                {/* =========================================
                    CONFIRMATION MESSAGE
                ========================================== */}

                <h1>
                    Order Confirmed 🎉
                </h1>


                <p>
                    Thank you for shopping with CurtainStore.
                </p>



                {/* =========================================
                    ORDER DETAILS
                ========================================== */}

                <div className="order-details">


                    <h2>
                        Order Details
                    </h2>


                    <p>

                        Order ID:

                        {" "}

                        <strong>
                            {order._id}
                        </strong>

                    </p>


                    <p>

                        Date:

                        {" "}

                        {orderDate}

                    </p>


                    <p>

                        Total:

                        {" "}

                        Ksh {formattedTotal}

                    </p>


                    <p>

                        Payment Method:

                        {" "}

                        {order.paymentMethod}

                    </p>


                    <p>

                        Payment Status:

                        {" "}

                        {order.paymentStatus}

                    </p>


                    <p>

                        Order Status:

                        {" "}

                        {order.orderStatus}

                    </p>


                </div>



                {/* =========================================
                    SHIPPING DETAILS
                ========================================== */}

                <div className="customer-details">


                    <h2>
                        Shipping Details
                    </h2>


                    <p>

                        Name:

                        {" "}

                        {order.shippingAddress?.fullName}

                    </p>


                    <p>

                        Email:

                        {" "}

                        {user?.email || "N/A"}

                    </p>


                    <p>

                        Phone:

                        {" "}

                        {order.shippingAddress?.phone}

                    </p>


                    <p>

                        Address:

                        {" "}

                        {order.shippingAddress?.address},

                        {" "}

                        {order.shippingAddress?.city}

                    </p>


                </div>



                {/* =========================================
                    ORDERED PRODUCTS
                ========================================== */}

                <div className="ordered-products">


                    <h2>
                        Products
                    </h2>


                    {order.items &&
                        order.items.map(
                            (item, index) => (

                                <div
                                    className="confirmed-item"
                                    key={
                                        item.product?._id ||
                                        `${order._id}-${index}`
                                    }
                                >


                                    <img
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.name
                                        }
                                    />


                                    <div>


                                        <h3>
                                            {item.name}
                                        </h3>


                                        <p>

                                            Quantity:

                                            {" "}

                                            {item.quantity}

                                        </p>


                                        <p>

                                            Price:

                                            {" "}

                                            Ksh{" "}

                                            {Number(
                                                item.price
                                            ).toLocaleString()}

                                        </p>


                                        <p>

                                            Subtotal:

                                            {" "}

                                            Ksh{" "}

                                            {Number(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString()}

                                        </p>


                                    </div>


                                </div>

                            )
                        )
                    }


                </div>



                {/* =========================================
                    CONTINUE SHOPPING
                ========================================== */}

                <Link
                    to="/products"
                    className="continue-shopping"
                >

                    Continue Shopping

                </Link>


            </div>


        </div>

    );

}


export default OrderConfirmation;