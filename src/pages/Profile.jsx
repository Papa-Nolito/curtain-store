import {

    useAuth

} from "../context/AuthContext";


import {

    Link

} from "react-router-dom";


import "../styles/Profile.css";






function Profile(){





    const {

        user

    } = useAuth();








    const orders =

    JSON.parse(

        localStorage.getItem("orders")

    ) || [];








    return(




        <div className="profile-container page-animation">







            <h1>

                My Profile

            </h1>









            <div className="profile-card">






                <h2>

                    {user?.name}

                </h2>







                <p>

                    Email:

                    {user?.email}

                </p>








                <p>

                    Account Status:

                    Active

                </p>






            </div>









            <section className="orders-section">





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








                        <Link

                        to={`/order-details/${order.id}`}

                        className="view-order"

                        >

                            View Order

                        </Link>








                    </div>





                ))





                }








            </section>








        </div>



    );


}





export default Profile;