
import {
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    FaHeart,
    FaShoppingCart,
    FaStar,
    FaMinus,
    FaPlus
} from "react-icons/fa";

import {
    useProducts
} from "../context/ProductContext";

import "../styles/ProductCard.css";


function ProductCard({ product }) {

    // =====================================================
    // QUANTITY
    // =====================================================

    const [
        quantity,
        setQuantity
    ] = useState(1);


    // =====================================================
    // PRODUCT CONTEXT
    // =====================================================

    const {
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        addToCart
    } = useProducts();


    // =====================================================
    // CHECK IF PRODUCT IS WISHLISTED
    // =====================================================

    const isWishlisted =
        wishlistItems.some(
            item => item.id === product.id
        );


    // =====================================================
    // TOGGLE WISHLIST
    // =====================================================

    function toggleWishlist() {

        if (isWishlisted) {

            removeFromWishlist(
                product.id
            );

        } else {

            addToWishlist(
                product
            );
        }
    }


    // =====================================================
    // INCREASE QUANTITY
    // =====================================================

    function increaseQuantity() {

        setQuantity(
            previous => previous + 1
        );
    }


    // =====================================================
    // DECREASE QUANTITY
    // =====================================================

    function decreaseQuantity() {

        if (quantity > 1) {

            setQuantity(
                previous => previous - 1
            );
        }
    }


    // =====================================================
    // ADD TO CART
    // =====================================================

    function handleAddToCart() {

        /*
         * Send the selected quantity together
         * with the product.
         */

        addToCart({
            ...product,
            quantity
        });


        // Reset ProductCard quantity
        // after adding to cart

        setQuantity(1);
    }


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="product-card">


            {/* =================================================
                PRODUCT BADGE
            ================================================= */}

            <span className="badge">

                {product.badge}

            </span>


            {/* =================================================
                WISHLIST
            ================================================= */}

            <FaHeart

                className={
                    `wishlist ${
                        isWishlisted
                            ? "active"
                            : ""
                    }`
                }

                onClick={toggleWishlist}

            />


            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <Link
                to={`/products/${product.id}`}
            >

                <img
                    src={product.image}
                    alt={product.name}
                />

            </Link>


            {/* =================================================
                PRODUCT NAME
            ================================================= */}

            <Link
                to={`/products/${product.id}`}
                className="product-link"
            >

                <h3>

                    {product.name}

                </h3>

            </Link>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p className="description">

                {product.description}

            </p>


            {/* =================================================
                CATEGORY
            ================================================= */}

            <p className="category">

                Category: {product.category}

            </p>


            {/* =================================================
                RATING
            ================================================= */}

            <div className="rating">

                <FaStar />

                <span>

                    {product.rating}

                </span>

                <small>

                    ({product.reviews} Reviews)

                </small>

            </div>


            {/* =================================================
                PRICE
            ================================================= */}

            <div className="prices">

                <span className="new-price">

                    Ksh{" "}

                    {Number(product.price)
                        .toLocaleString()}

                </span>


                {product.oldPrice && (

                    <span className="old-price">

                        Ksh{" "}

                        {Number(product.oldPrice)
                            .toLocaleString()}

                    </span>

                )}

            </div>


            {/* =================================================
                QUANTITY
            ================================================= */}

            <div className="quantity">


                <button
                    onClick={decreaseQuantity}
                    type="button"
                >

                    <FaMinus />

                </button>


                <span>

                    {quantity}

                </span>


                <button
                    onClick={increaseQuantity}
                    type="button"
                >

                    <FaPlus />

                </button>


            </div>


            {/* =================================================
                ADD TO CART
            ================================================= */}

            <button
                className="cart-btn"
                onClick={handleAddToCart}
                type="button"
            >

                <FaShoppingCart />

                <span>

                    Add to Cart

                </span>

            </button>


        </div>
    );
}


export default ProductCard;

