import {
    useAuth
} from "../context/AuthContext";


import "../styles/Profile.css";



function Profile(){



    const {
        user
    } = useAuth();





    const orders =

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];







    return (



        <div className="profile-container">





            <h1>
                My Profile
            </h1>






            <div className="profile-card">





                <h2>

                {user.name}

                </h2>





                <p>

                Email:

                {user.email}

                </p>





                <p>

                Account Status:

                Active

                </p>





            </div>









            <div className="orders-section">





                <h2>
                    My Orders
                </h2>






                {

                orders.length === 0 ?



                (

                    <p>
                        You have no orders yet.
                    </p>


                )



                :



                (



                    orders.map(order=>(




                        <div

                        className="order-card"

                        key={order.id}

                        >






                            <h3>

                            Order ID:

                            {order.id}

                            </h3>






                            <p>

                            Date:

                            {order.date}

                            </p>







                            <p>

                            Total:

                            Ksh {order.total}

                            </p>








                            <div className="order-products">





                                {

                                order.products.map(product=>(



                                    <div

                                    className="profile-product"

                                    key={product.id}

                                    >





                                        <img

                                        src={product.image}

                                        alt={product.name}

                                        />





                                        <div>


                                            <p>

                                            {product.name}

                                            </p>


                                            <p>

                                            Quantity:

                                            {product.quantity}

                                            </p>


                                        </div>





                                    </div>



                                ))

                                }



                            </div>






                        </div>



                    ))



                )

                }





            </div>






        </div>



    );


}



export default Profile;