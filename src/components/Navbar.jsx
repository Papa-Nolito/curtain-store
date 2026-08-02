import {
    useState
} from "react";


import {
    Link,
    useNavigate
} from "react-router-dom";


import {
    FaBars,
    FaTimes,
    FaShoppingCart,
    FaUser
} from "react-icons/fa";


import {
    useAuth
} from "../context/AuthContext";


import {
    useProducts
} from "../context/ProductContext";


import "../styles/Navbar.css";





function Navbar(){



    const [menuOpen,setMenuOpen] =

    useState(false);






    const {

        user,

        logout

    } = useAuth();








    const {

        cartItems

    } = useProducts();







    const navigate = useNavigate();









    function closeMenu(){


        setMenuOpen(false);


    }









    function handleLogout(){



        logout();


        closeMenu();


        navigate("/login");


    }









    return(



        <nav className="navbar">






            <div className="navbar-container">







                <Link

                to="/"

                className="logo"

                onClick={closeMenu}

                >

                    CurtainStore

                </Link>









                <button

                className="menu-toggle"

                onClick={()=>setMenuOpen(!menuOpen)}

                >



                    {

                    menuOpen

                    ?

                    <FaTimes />

                    :

                    <FaBars />

                    }



                </button>









                <div

                className={

                `nav-links

                ${menuOpen ? "active" : ""}`

                }

                >






                    <Link

                    to="/"

                    onClick={closeMenu}

                    >

                    Home

                    </Link>








                    <Link

                    to="/products"

                    onClick={closeMenu}

                    >

                    Products

                    </Link>








                    <Link

                    to="/cart"

                    onClick={closeMenu}

                    className="cart-link"

                    >



                        <FaShoppingCart />


                        Cart


                        {

                        cartItems.length > 0 &&


                        <span className="cart-count">


                            {cartItems.length}


                        </span>


                        }



                    </Link>









                    {

                    user

                    ?


                    <>


                        <Link

                        to="/profile"

                        onClick={closeMenu}

                        >


                            <FaUser />


                            Profile


                        </Link>







                        <button

                        className="logout-btn"

                        onClick={handleLogout}

                        >


                            Logout


                        </button>



                    </>



                    :



                    <>


                        <Link

                        to="/login"

                        onClick={closeMenu}

                        >

                            Login

                        </Link>







                        <Link

                        to="/register"

                        onClick={closeMenu}

                        >

                            Register

                        </Link>


                    </>



                    }







                </div>







            </div>







        </nav>


    );



}



export default Navbar;