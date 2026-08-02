import {

    useParams,

    Link

} from "react-router-dom";


import "../styles/OrderDetails.css";






function OrderDetails(){





    const {

        id

    } = useParams();









    const orders =

    JSON.parse(

        localStorage.getItem(

            "orders"

        )

    ) || [];









    const order =

    orders.find(

        item =>

        item.id === id

    );









    if(!order){



        return(



            <div className="order-details-page">





                <h1>

                    Order Not Found

                </h1>







                <Link

                to="/profile"

                >

                    Back To Profile

                </Link>






            </div>



        );


    }









    return(





        <div className="order-details-page page-animation">






            <div className="order-details-card">







                <h1>

                    Order Details

                </h1>









                <div className="order-information">






                    <h2>

                        Order Information

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








                    <p>

                        Status:

                        <span className="status">

                            Completed

                        </span>

                    </p>







                </div>









                <div className="customer-information">





                    <h2>

                        Customer Information

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

                        Phone:

                        {order.customer.phone}

                    </p>








                    <p>

                        Address:

                        {order.customer.address},

                        {order.customer.city},

                        {order.customer.country}

                    </p>








                </div>









                <div className="products-information">






                    <h2>

                        Ordered Products

                    </h2>









                    {

                    order.products.map(product=>(






                        <div

                        className="order-product"

                        key={product.id}

                        >







                            <img

                            src={product.image}

                            alt={product.name}

                            />








                            <div>






                                <h3>

                                    {product.name}

                                </h3>








                                <p>

                                    Quantity:

                                    {product.quantity}

                                </p>








                                <p>

                                    Price:

                                    Ksh {product.price}

                                </p>







                                <p>

                                    Subtotal:

                                    Ksh {product.price * product.quantity}

                                </p>







                            </div>







                        </div>







                    ))

                    }







                </div>









                <div className="order-total">





                    <h2>

                        Total Paid:

                        Ksh {order.total}

                    </h2>







                </div>








                <Link

                to="/profile"

                className="back-profile"

                >

                    Back To Profile

                </Link>







            </div>






        </div>



    );


}






export default OrderDetails;