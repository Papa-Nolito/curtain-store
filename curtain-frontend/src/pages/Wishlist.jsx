import ProductCard from "../components/ProductCard";

import {
    useProducts
} from "../context/ProductContext";

import "../styles/Wishlist.css";


function Wishlist() {

    // =====================================================
    // PRODUCTS CONTEXT
    // =====================================================

    const {
        wishlistItems,
        wishlistLoading,
        wishlistError
    } = useProducts();


    // =====================================================
    // WISHLIST COUNT
    // =====================================================

    const wishlistCount =
        wishlistItems.length;


    // =====================================================
    // LOADING STATE
    // =====================================================

    if (wishlistLoading) {
        return (
            <section className="wishlist-page">

                <div className="wishlist-header">

                    <h1>
                        My Wishlist
                    </h1>

                </div>

                <div className="empty-wishlist">

                    <h2>
                        Loading Your Wishlist...
                    </h2>

                    <p>
                        Please wait while we load your
                        favourite curtains.
                    </p>

                </div>

            </section>
        );
    }


    // =====================================================
    // ERROR STATE
    // =====================================================

    if (wishlistError) {
        return (
            <section className="wishlist-page">

                <div className="wishlist-header">

                    <h1>
                        My Wishlist
                    </h1>

                </div>

                <div className="empty-wishlist">

                    <h2>
                        Unable To Load Wishlist
                    </h2>

                    <p>
                        {wishlistError}
                    </p>

                </div>

            </section>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (
        <section className="wishlist-page">


            {/* =================================================
                WISHLIST HEADER
            ================================================= */}

            <div className="wishlist-header">

                <h1>
                    My Wishlist
                </h1>

                <p>
                    {wishlistCount}
                    {" "}
                    Item
                    {wishlistCount !== 1
                        ? "s"
                        : ""
                    }
                </p>

            </div>


            {/* =================================================
                EMPTY WISHLIST
            ================================================= */}

            {
                wishlistItems.length === 0

                    ?

                    (
                        <div className="empty-wishlist">

                            <h2>
                                Your wishlist is empty ❤️
                            </h2>

                            <p>
                                Start adding your favourite
                                curtains.
                            </p>

                        </div>
                    )

                    :

                    (

                        /* =========================================
                           WISHLIST PRODUCTS
                        ========================================= */

                        <div className="wishlist-grid">

                            {
                                wishlistItems.map(
                                    product => (

                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />

                                    )
                                )
                            }

                        </div>
                    )
            }


        </section>
    );
}


export default Wishlist;

