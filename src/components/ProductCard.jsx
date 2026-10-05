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



function ProductCard({product}){



    const [quantity,setQuantity] = useState(1);





    const {

        wishlist,

        addToWishlist,

        removeFromWishlist,

        addToCart

    } = useProducts();








    const isWishlisted = wishlist.some(

        (item)=>

        item.id === product.id

    );








    function toggleWishlist(){



        if(isWishlisted){



            removeFromWishlist(product.id);



        }else{



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



        addToCart({

            ...product,

            quantity

        });




        setQuantity(1);



    }









    return (



        <div className="product-card">






            <span className="badge">

                {product.badge}

            </span>








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








            <Link

            to={`/products/${product.id}`}

            >



                <img

                src={product.image}

                alt={product.name}

                />



            </Link>









            <Link

            to={`/products/${product.id}`}

            className="product-link"

            >



                <h3>

                    {product.name}

                </h3>



            </Link>









            <p className="description">

                {product.description}

            </p>









            <p className="category">

                Category: {product.category}

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





                {

                product.oldPrice &&



                <span className="old-price">

                    Ksh {product.oldPrice}

                </span>


                }



            </div>









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









            <button

            className="cart-btn"

            onClick={handleAddToCart}

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