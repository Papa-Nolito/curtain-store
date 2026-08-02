import {
    useProducts
} from "../context/ProductContext";


import {
    Link
} from "react-router-dom";


import "../styles/Cart.css";



function Cart(){



    const {

        cartItems,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity

    } = useProducts();







    const total = cartItems.reduce(

        (sum,item)=>

        sum + (

            item.price *

            item.quantity

        ),

        0

    );







    return (


        <div className="cart-page">





            <h2>
                Shopping Cart
            </h2>







            {

            cartItems.length === 0 ?



            (

                <p>

                Your cart is empty

                </p>


            )



            :



            (


                <>



                {

                cartItems.map(item=>(



                    <div

                    className="cart-item"

                    key={item.id}

                    >






                        <img

                        src={item.image}

                        alt={item.name}

                        />







                        <div>



                            <h3>

                            {item.name}

                            </h3>





                            <p>

                            Price: ${item.price}

                            </p>







                            <div className="quantity">





                                <button

                                onClick={()=>

                                decreaseQuantity(item.id)

                                }

                                >

                                -

                                </button>





                                <span>

                                {item.quantity}

                                </span>





                                <button

                                onClick={()=>

                                increaseQuantity(item.id)

                                }

                                >

                                +

                                </button>





                            </div>








                            <button

                            className="remove"

                            onClick={()=>

                            removeFromCart(item.id)

                            }

                            >

                            Remove

                            </button>






                        </div>







                    </div>



                ))

                }







                <h3>

                Total: ${total}

                </h3>







                <Link

                to="/checkout"

                >


                    <button

                    className="checkout-btn"

                    >

                    Proceed To Checkout

                    </button>


                </Link>





                </>


            )

            }







        </div>


    );


}



export default Cart;