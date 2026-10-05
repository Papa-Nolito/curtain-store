import {
    Link
} from "react-router-dom";


import {
    useProducts
} from "../context/ProductContext";


import "../styles/CartSidebar.css";



function CartSidebar(){


    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useProducts();





    const total = cartItems.reduce(

        (sum,item)=>

        sum + item.price * item.quantity,

        0

    );





    return (

        <div className="cart-sidebar">



            <h2>
                Your Cart
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


                )

            }




            {

            cartItems.length > 0 &&


            <>


                <div className="cart-total">


                    <h3>

                    Total:
                    
                    Ksh {total}

                    </h3>


                </div>





                <Link

                to="/checkout"

                className="checkout-link"

                >

                    <button

                    className="checkout-btn"

                    >

                    Proceed To Checkout

                    </button>


                </Link>



            </>


            }



        </div>

    );


}



export default CartSidebar;