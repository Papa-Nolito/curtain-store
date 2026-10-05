import {
    Link
} from "react-router-dom";

import {
    useProducts
} from "../context/ProductContext";

import "../styles/Cart.css";


function Cart() {

    // =====================================================
    // CART CONTEXT
    // =====================================================

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartLoading,
        cartError
    } = useProducts();


    // =====================================================
    // CALCULATE TOTAL
    // =====================================================

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            Number(item.quantity),
        0
    );


    // =====================================================
    // CART LOADING
    // =====================================================

    if (cartLoading) {

        return (
            <div className="cart-page page-animation">

                <h1>
                    Shopping Cart
                </h1>

                <div className="empty-cart">

                    <h2>
                        Loading Your Cart...
                    </h2>

                    <p>
                        Please wait while we load your cart.
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // CART ERROR
    // =====================================================

    if (cartError) {

        return (
            <div className="cart-page page-animation">

                <h1>
                    Shopping Cart
                </h1>

                <div className="empty-cart">

                    <h2>
                        Unable To Load Cart
                    </h2>

                    <p>
                        {cartError}
                    </p>

                    <Link
                        to="/products"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }


    // =====================================================
    // RETURN
    // =====================================================

    return (
        <div className="cart-page page-animation">

            {/* =================================================
                PAGE TITLE
            ================================================= */}

            <h1>
                Shopping Cart
            </h1>


            {/* =================================================
                EMPTY CART
            ================================================= */}

            {cartItems.length === 0 ? (

                <div className="empty-cart">

                    <h2>
                        Your Cart Is Empty
                    </h2>

                    <p>
                        Add some beautiful curtains
                        to continue shopping.
                    </p>

                    <Link
                        to="/products"
                    >
                        Browse Products
                    </Link>

                </div>

            ) : (

                <>


                    {/* =========================================
                        CART ITEMS
                    ========================================= */}

                    <div className="cart-items">

                        {cartItems.map(item => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >


                                {/* ==============================
                                    PRODUCT IMAGE
                                ============================== */}

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />


                                {/* ==============================
                                    PRODUCT DETAILS
                                ============================== */}

                                <div className="cart-details">

                                    <h3>
                                        {item.name}
                                    </h3>


                                    <p>
                                        Price:
                                        {" "}
                                        Ksh{" "}
                                        {Number(
                                            item.price
                                        ).toLocaleString()}
                                    </p>


                                    {/* ==========================
                                        QUANTITY CONTROLS
                                    ========================== */}

                                    <div className="quantity-controls">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item.id
                                                )
                                            }
                                            disabled={cartLoading}
                                        >
                                            -
                                        </button>


                                        <span>
                                            {item.quantity}
                                        </span>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(
                                                    item.id
                                                )
                                            }
                                            disabled={cartLoading}
                                        >
                                            +
                                        </button>

                                    </div>


                                    {/* ==========================
                                        REMOVE
                                    ========================== */}

                                    <button
                                        className="remove-btn"
                                        type="button"
                                        onClick={() =>
                                            removeFromCart(
                                                item.id
                                            )
                                        }
                                        disabled={cartLoading}
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* =========================================
                        CART SUMMARY
                    ========================================= */}

                    <div className="cart-summary">

                        <h2>
                            Total:
                            {" "}
                            Ksh{" "}
                            {total.toLocaleString()}
                        </h2>


                        <Link
                            to="/checkout"
                            className="checkout-btn"
                        >
                            Proceed To Checkout
                        </Link>

                    </div>

                </>

            )}

        </div>
    );
}


export default Cart;