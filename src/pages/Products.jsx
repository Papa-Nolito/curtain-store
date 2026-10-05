import {
    useProducts
} from "../context/ProductContext";


import ProductCard from "../components/ProductCard";


import ProductSearch from "../components/ProductSearch";


import "../styles/Products.css";





function Products(){



    const {

        filteredProducts

    } = useProducts();






    return(



        <div className="products-page page-animation">





            <div className="products-header">



                <h1>

                    Our Products

                </h1>



                <p>

                    Discover quality curtains designed for every home.

                </p>



            </div>







            <ProductSearch />








            {

            filteredProducts.length === 0 ?




            (



                <div className="no-products">



                    <h2>

                        No Products Found

                    </h2>



                    <p>

                        Try searching for another curtain style.

                    </p>



                </div>



            )





            :





            (



                <div className="products-grid">





                    {

                    filteredProducts.map(product=>(



                        <ProductCard

                        key={product.id}

                        product={product}

                        />



                    ))



                    }





                </div>



            )





            }








        </div>


    );


}




export default Products;