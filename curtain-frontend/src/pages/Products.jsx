import {
    useProducts
} from "../context/ProductContext";


import ProductCard from "../components/ProductCard";


import ProductSearch from "../components/ProductSearch";


import "../styles/Products.css";


function Products() {


    const {
        filteredProducts,
        loading,
        error,
        loadProducts
    } = useProducts();


    return (

        <div className="products-page page-animation">


            {/* =====================================================
                PRODUCTS HEADER
            ===================================================== */}

            <div className="products-header">

                <h1>
                    Our Products
                </h1>

                <p>
                    Discover quality curtains designed for every home.
                </p>

            </div>


            {/* =====================================================
                PRODUCT SEARCH
            ===================================================== */}

            <ProductSearch />


            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading && (

                <div className="products-loading">

                    <p>
                        Loading products...
                    </p>

                </div>

            )}


            {/* =====================================================
                ERROR
            ===================================================== */}

            {error && !loading && (

                <div className="products-error">

                    <h2>
                        Unable to Load Products
                    </h2>

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


            {/* =====================================================
                PRODUCTS
            ===================================================== */}

            {!loading &&
                !error &&
                filteredProducts.length > 0 && (

                    <div className="products-grid">

                        {filteredProducts.map(product => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))}

                    </div>

                )}


            {/* =====================================================
                NO PRODUCTS
            ===================================================== */}

            {!loading &&
                !error &&
                filteredProducts.length === 0 && (

                    <div className="no-products">

                        <h2>
                            No Products Found
                        </h2>

                        <p>
                            Try searching for another curtain style.
                        </p>

                    </div>

                )}


        </div>

    );

}


export default Products;