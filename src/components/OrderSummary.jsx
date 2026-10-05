import {
    useProducts
} from "../context/ProductContext";


import "../styles/OrderSummary.css";



function OrderSummary(){



    const {
        cartItems
    } = useProducts();






    const total = cartItems.reduce(

        (sum,item)=>

        sum + (item.price * item.quantity),

        0

    );







    return (


        <div className="order-summary">



            <h2>
                Order Summary
            </h2>





            {

            cartItems.length === 0 ?


            (

                <p>
                    Your cart is empty.
                </p>

            )


            :


            (


                cartItems.map(item=>(


                    <div

                    className="summary-item"

                    key={item.id}

                    >



                        <img

                        src={item.image}

                        alt={item.name}

                        />





                        <div className="summary-details">


                            <h3>
                                {item.name}
                            </h3>


                            <p>
                                Quantity: {item.quantity}
                            </p>


                            <p>
                                Ksh {item.price}
                            </p>


                        </div>



                    </div>


                ))



            )

            }







            <div className="summary-total">


                <h3>

                    Total:

                    Ksh {total}

                </h3>



            </div>





        </div>


    );


}



export default OrderSummary;