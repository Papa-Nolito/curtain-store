import {
    Link
} from "react-router-dom";


import {
    useProducts
} from "../context/ProductContext";


import "../styles/Cart.css";







function Cart(){





    const {


        cartItems,


        removeFromCart,


        increaseQuantity,


        decreaseQuantity



    } = useProducts();









    const total =

    cartItems.reduce(


        (sum,item)=>


        sum +

        item.price *

        item.quantity,

        0


    );









    return(



        <div className="cart-page page-animation">






            <h1>

                Shopping Cart

            </h1>









            {

            cartItems.length === 0 ?





            (




                <div className="empty-cart">






                    <h2>

                        Your Cart Is Empty

                    </h2>






                    <p>

                        Add some beautiful curtains
                        to continue shopping.

                    </p>








                    <Link

                    to="/products"

                    >

                        Browse Products

                    </Link>






                </div>





            )







            :





            (



                <>





                <div className="cart-items">






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








                            <div className="cart-details">






                                <h3>

                                    {item.name}

                                </h3>







                                <p>

                                    Price:

                                    Ksh {item.price}

                                </p>








                                <div className="quantity-controls">





                                    <button

                                    onClick={()=>decreaseQuantity(item.id)}

                                    >

                                        -

                                    </button>








                                    <span>

                                        {item.quantity}

                                    </span>








                                    <button

                                    onClick={()=>increaseQuantity(item.id)}

                                    >

                                        +

                                    </button>






                                </div>








                                <button

                                className="remove-btn"

                                onClick={()=>removeFromCart(item.id)}

                                >

                                    Remove

                                </button>







                            </div>







                        </div>





                    ))



                    }






                </div>









                <div className="cart-summary">






                    <h2>

                        Total:

                        Ksh {total}

                    </h2>







                    <Link

                    to="/checkout"

                    className="checkout-btn"

                    >

                        Proceed To Checkout

                    </Link>







                </div>







                </>



            )







            }






        </div>



    );


}





export default Cart;