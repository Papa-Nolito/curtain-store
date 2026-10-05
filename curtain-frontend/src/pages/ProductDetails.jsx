import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import {
    FaShoppingCart,
    FaStar,
    FaMinus,
    FaPlus,
    FaHeart
} from "react-icons/fa";

import ProductCard from "../components/ProductCard";

import {
    useProducts
} from "../context/ProductContext";

import "../styles/ProductDetails.css";


function ProductDetails() {


    // =====================================================
    // PRODUCT ID FROM URL
    // =====================================================

    const {
        id
    } = useParams();


    // =====================================================
    // PRODUCT CONTEXT
    // =====================================================

    const {
        products,
        loading,
        error,
        addToCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist
    } = useProducts();


    // =====================================================
    // FIND PRODUCT
    // =====================================================

    const product = products.find(
        item => item.id === id
    );


    // =====================================================
    // QUANTITY
    // =====================================================

    const [
        quantity,
        setQuantity
    ] = useState(1);


    // =====================================================
    // RECENTLY VIEWED PRODUCTS
    // =====================================================

    useEffect(() => {

        if (product) {

            const savedProducts =
                JSON.parse(
                    localStorage.getItem(
                        "recentProducts"
                    )
                ) || [];


            const updatedProducts = [

                product,

                ...savedProducts.filter(
                    item =>
                        item.id !== product.id
                )

            ].slice(0, 6);


            localStorage.setItem(
                "recentProducts",
                JSON.stringify(updatedProducts)
            );

        }

    }, [product]);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="product-error">

                <h2>

                    Loading Product...

                </h2>

                <p>

                    Please wait while we load the product.

                </p>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="product-error">

                <h2>

                    Unable To Load Product

                </h2>

                <p>

                    {error}

                </p>

                <Link to="/products">

                    Back To Products

                </Link>

            </div>

        );

    }


    // =====================================================
    // PRODUCT NOT FOUND
    // =====================================================

    if (!product) {

        return (

            <div className="product-error">

                <h2>

                    Product Not Found

                </h2>

                <p>

                    The product you are looking for
                    does not exist.

                </p>

                <Link to="/products">

                    Back To Products

                </Link>

            </div>

        );

    }


    // =====================================================
    // WISHLIST STATUS
    // =====================================================

    const isWishlisted =
        wishlistItems.some(
            item =>
                item.id === product.id
        );


    // =====================================================
    // TOGGLE WISHLIST
    // =====================================================

    function toggleWishlist() {

        if (isWishlisted) {

            removeFromWishlist(
                product.id
            );

        }

        else {

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
            previous =>
                previous + 1
        );

    }


    // =====================================================
    // DECREASE QUANTITY
    // =====================================================

    function decreaseQuantity() {

        if (quantity > 1) {

            setQuantity(
                previous =>
                    previous - 1
            );

        }

    }


    // =====================================================
    // ADD TO CART
    // =====================================================

    function handleAddToCart() {

        addToCart(
            product,
            quantity
        );

        setQuantity(1);

    }


    // =====================================================
    // RELATED PRODUCTS
    // =====================================================

    const relatedProducts =
        products.filter(
            item =>
                item.category === product.category &&
                item.id !== product.id
        );


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <>


            {/* =================================================
                PRODUCT DETAILS
            ================================================= */}

            <section className="product-details">


                {/* =================================================
                    PRODUCT IMAGE
                ================================================= */}

                <div className="product-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="details">


                    {/* =================================================
                        BREADCRUMB
                    ================================================= */}

                    <p className="breadcrumb">

                        <Link to="/">

                            Home

                        </Link>

                        {" / "}

                        <Link to="/products">

                            Products

                        </Link>

                        {" / "}

                        {product.name}

                    </p>


                    {/* =================================================
                        BADGE
                    ================================================= */}

                    {product.badge && (

                        <span className="badge">

                            {product.badge}

                        </span>

                    )}


                    {/* =================================================
                        PRODUCT NAME
                    ================================================= */}

                    <h1>

                        {product.name}

                    </h1>


                    {/* =================================================
                        CATEGORY
                    ================================================= */}

                    <p className="category">

                        Category:

                        {" "}

                        {product.category}

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

                            {Number(
                                product.price
                            ).toLocaleString()}

                        </span>


                        {product.oldPrice && (

                            <span className="old-price">

                                Ksh{" "}

                                {Number(
                                    product.oldPrice
                                ).toLocaleString()}

                            </span>

                        )}

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p className="description">

                        {product.description}

                    </p>


                    {/* =================================================
                        QUANTITY
                    ================================================= */}

                    <div className="quantity">


                        <button
                            type="button"
                            onClick={decreaseQuantity}
                        >

                            <FaMinus />

                        </button>


                        <span>

                            {quantity}

                        </span>


                        <button
                            type="button"
                            onClick={increaseQuantity}
                        >

                            <FaPlus />

                        </button>


                    </div>


                    {/* =================================================
                        PRODUCT ACTIONS
                    ================================================= */}

                    <div className="product-actions">


                        {/* =============================================
                            ADD TO CART
                        ============================================= */}

                        <button
                            type="button"
                            className="add-btn"
                            onClick={handleAddToCart}
                        >

                            <FaShoppingCart />

                            Add To Cart

                        </button>


                        {/* =============================================
                            WISHLIST
                        ============================================= */}

                        <button
                            type="button"
                            className={
                                `wishlist-button ${
                                    isWishlisted
                                        ? "active"
                                        : ""
                                }`
                            }
                            onClick={toggleWishlist}
                        >

                            <FaHeart />

                        </button>


                    </div>


                </div>


            </section>


            {/* =================================================
                RELATED PRODUCTS
            ================================================= */}

            {relatedProducts.length > 0 && (

                <section className="related-products">


                    <h2>

                        Related Products

                    </h2>


                    <div className="products-grid">

                        {relatedProducts.map(item => (

                            <ProductCard
                                key={item.id}
                                product={item}
                            />

                        ))}

                    </div>


                </section>

            )}


        </>

    );

}


export default ProductDetails;