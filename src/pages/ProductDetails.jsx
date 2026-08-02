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



import products from "../data/products";



import "../styles/ProductDetails.css";







function ProductDetails(){





    const {

        id

    } = useParams();









    const {


        addToCart,


        wishlist,


        addToWishlist,


        removeFromWishlist



    } = useProducts();








    const product =

    products.find(

        item =>

        item.id === Number(id)

    );









    const [

        quantity,

        setQuantity

    ] = useState(1);









    // RECENTLY VIEWED PRODUCTS


    useEffect(()=>{



        if(product){



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



            ].slice(0,6);







            localStorage.setItem(

                "recentProducts",

                JSON.stringify(updatedProducts)

            );



        }



    },[product]);












    if(!product){



        return(


            <div className="product-error">



                <h2>

                Product Not Found

                </h2>





                <p>

                The product you are looking for does not exist.

                </p>







                <Link to="/products">


                    Back To Products


                </Link>




            </div>


        );


    }









    const isWishlisted =

    wishlist.some(

        item =>

        item.id === product.id

    );









    function toggleWishlist(){



        if(isWishlisted){



            removeFromWishlist(

                product.id

            );


        }

        else{


            addToWishlist(product);


        }



    }









    function increaseQuantity(){



        setQuantity(

            previous => previous + 1

        );


    }









    function decreaseQuantity(){



        if(quantity > 1){



            setQuantity(

                previous => previous - 1

            );


        }


    }









    function handleAddToCart(){



        for(

            let i = 0;

            i < quantity;

            i++

        ){


            addToCart(product);


        }



        setQuantity(1);


    }









    const relatedProducts =

    products.filter(item =>



        item.category === product.category

        &&

        item.id !== product.id



    );









    return(



        <>






            <section className="product-details">





                <div className="product-image">


                    <img


                    src={product.image}


                    alt={product.name}


                    />


                </div>








                <div className="details">





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









                    <span className="badge">


                        {product.badge}


                    </span>









                    <h1>


                        {product.name}


                    </h1>








                    <p className="category">


                        Category:

                        {product.category}


                    </p>









                    <div className="rating">



                        <FaStar />



                        <span>


                            {product.rating}


                        </span>





                        <small>


                            ({product.reviews} Reviews)


                        </small>




                    </div>









                    <div className="prices">



                        <span className="new-price">


                            Ksh {product.price}


                        </span>





                        <span className="old-price">


                            Ksh {product.oldPrice}


                        </span>




                    </div>









                    <p className="description">


                        {product.description}


                    </p>









                    <div className="quantity">



                        <button

                        onClick={decreaseQuantity}

                        >


                            <FaMinus />


                        </button>







                        <span>


                            {quantity}


                        </span>







                        <button

                        onClick={increaseQuantity}

                        >


                            <FaPlus />


                        </button>



                    </div>









                    <div className="product-actions">





                        <button


                        className="add-btn"


                        onClick={handleAddToCart}


                        >



                            <FaShoppingCart />


                            Add To Cart



                        </button>









                        <button


                        className={

                        `wishlist-button

                        ${isWishlisted ? "active" : ""}`

                        }



                        onClick={toggleWishlist}


                        >



                            <FaHeart />



                        </button>







                    </div>








                </div>







            </section>









            <section className="related-products">





                <h2>

                    Related Products

                </h2>








                <div className="products-grid">



                    {

                    relatedProducts.map(item => (



                        <ProductCard


                        key={item.id}


                        product={item}


                        />



                    ))


                    }



                </div>






            </section>








        </>


    );


}







export default ProductDetails;