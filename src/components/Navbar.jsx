import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";

import "../styles/Navbar.css";


function Navbar(){


    const {
        user,
        logout
    } = useAuth();


    const navigate = useNavigate();



    const handleLogout = () => {

        logout();

        navigate("/login");

    };



    return (

        <nav className="navbar">


            <div className="navbar-logo">

                <Link to="/">
                    Curtain Store
                </Link>

            </div>




            <div className="nav-links">


                <Link to="/">
                    Home
                </Link>


                <Link to="/products">
                    Products
                </Link>


                <Link to="/cart">
                    Cart
                </Link>



                {
                    user ? (

                        <>


                            <Link to="/profile">
                                Profile
                            </Link>



                            <button
                            className="logout-btn"
                            onClick={handleLogout}
                            >

                                Logout

                            </button>


                        </>


                    ) : (

                        <>


                            <Link to="/login">
                                Login
                            </Link>



                            <Link to="/register">
                                Register
                            </Link>


                        </>

                    )
                }



            </div>


        </nav>

    );

}



export default Navbar;