import {

    useNavigate

} from "react-router-dom";


import {

    useProducts

} from "../context/ProductContext";


import "../styles/Payment.css";






function Payment(){





    const navigate = useNavigate();







    const {


        cartItems,


        clearCart



    } = useProducts();









    const customer =

    JSON.parse(

        localStorage.getItem(

            "checkoutCustomer"

        )

    );









    const total =

    cartItems.reduce(



        (sum,item)=>


        sum +

        item.price *

        item.quantity,


        0



    );









    function completePayment(){





        const order = {




            id:

            "ORD-" +

            Date.now(),






            date:

            new Date()

            .toLocaleDateString(),






            customer,






            products:

            cartItems,







            total






        };









        const existingOrders =

        JSON.parse(

            localStorage.getItem(

                "orders"

            )

        ) || [];









        localStorage.setItem(



            "orders",



            JSON.stringify([

                ...existingOrders,

                order

            ])



        );









        // Clear cart after payment

        clearCart();









        // Remove checkout temporary data

        localStorage.removeItem(

            "checkoutCustomer"

        );









        navigate(

            `/order-confirmation/${order.id}`

        );





    }









    return(





        <div className="payment-page page-animation">






            <h1>

                Payment

            </h1>









            <div className="payment-card">








                <h2>

                    Order Summary

                </h2>








                <p>

                    Items:

                    {cartItems.length}

                </p>








                <h3>

                    Total:

                    Ksh {total}

                </h3>








                <div className="payment-method">





                    <h3>

                        Payment Method

                    </h3>







                    <p>

                        💳 Card Payment (Simulation)

                    </p>





                    <p>

                        📱 M-Pesa (Simulation)

                    </p>






                </div>









                <button

                onClick={completePayment}

                >

                    Complete Payment

                </button>








            </div>






        </div>



    );


}





export default Payment;