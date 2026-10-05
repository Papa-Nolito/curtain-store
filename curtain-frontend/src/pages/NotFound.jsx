import {
    Link
} from "react-router-dom";


import "../styles/NotFound.css";





function NotFound(){


    return(


        <div className="not-found-page">





            <div className="not-found-card">





                <h1>

                    404

                </h1>





                <h2>

                    Page Not Found

                </h2>





                <p>

                    Sorry, the page you are looking for does not exist.

                </p>






                <div className="not-found-buttons">





                    <Link

                    to="/"

                    className="home-btn"

                    >

                        Go Home

                    </Link>







                    <Link

                    to="/products"

                    className="shop-btn"

                    >

                        Continue Shopping

                    </Link>





                </div>






            </div>







        </div>


    );


}



export default NotFound;