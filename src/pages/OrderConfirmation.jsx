import {
    useParams,
    Link
} from "react-router-dom";


import "../styles/OrderConfirmation.css";



function OrderConfirmation(){


    const {
        orderId
    } = useParams();




    const orders =

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];





    const order =

    orders.find(

        item => item.id === orderId

    );






    if(!order){


        return (

            <div className="confirmation-page">


                <h1>
                    Order Not Found
                </h1>


                <Link to="/">
                    Return Home
                </Link>


            </div>

        );


    }







    return (


        <div className="confirmation-page">





            <div className="confirmation-card">





                <h1>
                    Order Confirmed 🎉
                </h1>





                <p className="success-message">

                    Thank you for shopping with us.

                </p>








                <div className="order-details">



                    <h2>
                        Order Details
                    </h2>




                    <p>

                    Order ID:

                    <strong>

                    {order.id}

                    </strong>

                    </p>





                    <p>

                    Date:

                    {order.date}

                    </p>





                </div>









                <div className="customer-details">



                    <h2>
                        Shipping Details
                    </h2>




                    <p>

                    Name:

                    {order.customer.fullName}

                    </p>



                    <p>

                    Email:

                    {order.customer.email}

                    </p>



                    <p>

                    Address:

                    {order.customer.address},

                    {order.customer.city},

                    {order.customer.country}

                    </p>



                </div>









                <div className="ordered-products">



                    <h2>
                        Products
                    </h2>





                    {

                    order.products.map(item=>(


                        <div

                        className="confirmed-item"

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

                                Quantity:

                                {item.quantity}

                                </p>




                                <p>

                                Ksh

                                {item.price}

                                </p>



                            </div>




                        </div>


                    ))

                    }



                </div>









                <div className="confirmation-total">


                    <h2>

                    Total:

                    Ksh {order.total}

                    </h2>


                </div>







                <Link

                to="/products"

                className="continue-shopping"

                >

                    Continue Shopping

                </Link>







            </div>






        </div>


    );


}



export default OrderConfirmation;