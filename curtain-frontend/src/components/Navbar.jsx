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
    FaHeart,
    FaUser
} from "react-icons/fa";

import {
    useAuth
} from "../context/AuthContext";

import {
    useProducts
} from "../context/ProductContext";

import "../styles/Navbar.css";


function Navbar() {

    // =====================================================
    // MOBILE MENU
    // =====================================================

    const [
        menuOpen,
        setMenuOpen
    ] = useState(false);


    // =====================================================
    // AUTH
    // =====================================================

    const {
        user,
        logout
    } = useAuth();


    // =====================================================
    // PRODUCTS / CART / WISHLIST
    // =====================================================

    const {
        cartItems,
        wishlistItems
    } = useProducts();


    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();


    // =====================================================
    // CART ITEM COUNT
    // =====================================================

    const cartCount =
        cartItems.reduce(
            (
                total,
                item
            ) =>
                total +
                (item.quantity || 1),
            0
        );


    // =====================================================
    // WISHLIST ITEM COUNT
    // =====================================================

    const wishlistCount =
        wishlistItems.length;


    // =====================================================
    // CLOSE MOBILE MENU
    // =====================================================

    function closeMenu() {
        setMenuOpen(false);
    }


    // =====================================================
    // LOGOUT
    // =====================================================

    function handleLogout() {
        logout();
        closeMenu();
        navigate("/login");
    }


    // =====================================================
    // NAVBAR
    // =====================================================

    return (
        <nav className="navbar">

            <div className="navbar-container">


                {/* =================================================
                    LOGO
                ================================================= */}

                <Link
                    to="/"
                    className="logo"
                    onClick={closeMenu}
                >
                    CurtainStore
                </Link>


                {/* =================================================
                    MOBILE MENU BUTTON
                ================================================= */}

                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() =>
                        setMenuOpen(
                            !menuOpen
                        )
                    }
                >

                    {
                        menuOpen
                            ?
                            <FaTimes />
                            :
                            <FaBars />
                    }

                </button>


                {/* =================================================
                    NAVIGATION LINKS
                ================================================= */}

                <div
                    className={
                        `nav-links ${
                            menuOpen
                                ? "active"
                                : ""
                        }`
                    }
                >


                    {/* =================================================
                        HOME
                    ================================================= */}

                    <Link
                        to="/"
                        onClick={closeMenu}
                    >
                        Home
                    </Link>


                    {/* =================================================
                        PRODUCTS
                    ================================================= */}

                    <Link
                        to="/products"
                        onClick={closeMenu}
                    >
                        Products
                    </Link>


                    {/* =================================================
                        CART
                    ================================================= */}

                    <Link
                        to="/cart"
                        onClick={closeMenu}
                        className="cart-link"
                    >

                        <FaShoppingCart />

                        Cart

                        {
                            cartCount > 0 && (
                                <span className="cart-count">
                                    {cartCount}
                                </span>
                            )
                        }

                    </Link>


                    {/* =================================================
                        WISHLIST
                    ================================================= */}

                    <Link
                        to="/wishlist"
                        onClick={closeMenu}
                        className="wishlist-link"
                    >

                        <FaHeart />

                        Wishlist

                        {
                            wishlistCount > 0 && (
                                <span className="wishlist-count">
                                    {wishlistCount}
                                </span>
                            )
                        }

                    </Link>


                    {/* =================================================
                        AUTHENTICATED USER
                    ================================================= */}

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
                                    type="button"
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </>

                            :

                            <>

                                {/* =====================================
                                    LOGIN
                                ===================================== */}

                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>


                                {/* =====================================
                                    REGISTER
                                ===================================== */}

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

