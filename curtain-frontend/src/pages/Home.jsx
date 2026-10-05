import {
    Link
} from "react-router-dom";


import ProductCard from "../components/ProductCard";


import {
    useProducts
} from "../context/ProductContext";


import "../styles/Home.css";


function Home() {


    // =====================================================
    // PRODUCTS FROM PRODUCT CONTEXT
    // =====================================================

    const {
        products,
        loading,
        error,
        loadProducts
    } = useProducts();


    // =====================================================
    // FEATURED PRODUCTS
    // =====================================================

    const featuredProducts =
        products.slice(0, 6);


    return (

        <div className="home-page">


            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <section className="hero-section">

                <div className="hero-overlay">

                    <div className="hero-content">

                        <h1>
                            Transform Your Home With Elegant Curtains
                        </h1>


                        <p>
                            Discover modern curtain designs that bring
                            comfort, privacy and beauty to your living spaces.
                        </p>


                        <Link
                            to="/products"
                            className="shop-btn"
                        >
                            Shop Now
                        </Link>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FEATURED PRODUCTS
            ===================================================== */}

            <section className="featured-section">

                <h2>
                    Featured Products
                </h2>


                {/* LOADING */}

                {loading && (

                    <div className="products-loading">

                        <p>
                            Loading featured products...
                        </p>

                    </div>

                )}


                {/* ERROR */}

                {error && !loading && (

                    <div className="products-error">

                        <p>
                            {error}
                        </p>


                        <button
                            onClick={loadProducts}
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {/* PRODUCTS */}

                {!loading && !error && (

                    <div className="products-grid">

                        {featuredProducts.map(product => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </section>


            {/* =====================================================
                WHY CHOOSE US
            ===================================================== */}

            <section className="features-section">


                <h2>
                    Why Choose CurtainStore?
                </h2>


                <div className="features-container">


                    <div className="feature-card">

                        <div className="feature-icon">
                            ✨
                        </div>


                        <h3>
                            Premium Quality
                        </h3>


                        <p>
                            High quality curtains designed
                            for durability and long-lasting beauty.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🏠
                        </div>


                        <h3>
                            Modern Designs
                        </h3>


                        <p>
                            Stylish curtain designs suitable
                            for every home interior.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            💰
                        </div>


                        <h3>
                            Affordable Prices
                        </h3>


                        <p>
                            Beautiful curtains at reasonable
                            prices without compromising quality.
                        </p>

                    </div>


                </div>

            </section>


            {/* =====================================================
                CALL TO ACTION
            ===================================================== */}

            <section className="cta-section">


                <h2>
                    Give Your Home A New Look
                </h2>


                <p>
                    Explore our collection and find curtains
                    that match your style.
                </p>


                <Link
                    to="/products"
                    className="cta-btn"
                >
                    View Collection
                </Link>


            </section>


        </div>

    );

}


export default Home;