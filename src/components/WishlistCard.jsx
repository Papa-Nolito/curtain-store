import {
    FaShoppingCart,
    FaTrash
} from "react-icons/fa";


import "../styles/WishlistCard.css";





function WishlistCard({

    product,

    removeFromWishlist,

    addToCart

}){



    return(



        <div className="wishlist-card">





            <img

            src={product.image}

            alt={product.name}

            />







            <div className="wishlist-details">





                <h3>

                    {product.name}

                </h3>








                <p>

                    Ksh {product.price}

                </p>








                <div className="wishlist-actions">





                    <button

                    onClick={()=>addToCart(product)}

                    >

                        <FaShoppingCart/>

                        Add To Cart

                    </button>








                    <button

                    className="delete-btn"

                    onClick={()=>

                    removeFromWishlist(product.id)

                    }

                    >

                        <FaTrash/>

                        Remove

                    </button>







                </div>







            </div>






        </div>



    );


}



export default WishlistCard;