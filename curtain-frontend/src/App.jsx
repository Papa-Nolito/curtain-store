import {
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassword";

import Profile from "./pages/Profile";

import Checkout from "./pages/Checkout";

import Payment from "./pages/Payment";

import OrderConfirmation from "./pages/OrderConfirmation";

import OrderDetails from "./pages/OrderDetails";

import NotFound from "./pages/NotFound";


function App() {

    return (

        <div className="app">


            {/* =================================================
                NAVBAR
            ================================================= */}

            <Navbar />


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="main-content">

                <Routes>


                    {/* =================================================
                        PUBLIC ROUTES
                    ================================================= */}


                    {/* HOME */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* PRODUCTS */}

                    <Route
                        path="/products"
                        element={<Products />}
                    />


                    {/* PRODUCT DETAILS */}

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />


                    {/* CART */}

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />


                    {/* WISHLIST */}

                    <Route
                        path="/wishlist"
                        element={<Wishlist />}
                    />


                    {/* LOGIN */}

                    <Route
                        path="/login"
                        element={<Login />}
                    />


                    {/* REGISTER */}

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* FORGOT PASSWORD */}

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />


                    {/* =================================================
                        PROTECTED ROUTES
                    ================================================= */}


                    {/* PROFILE */}

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />


                    {/* CHECKOUT */}

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />


                    {/* PAYMENT */}

                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />


                    {/* ORDER DETAILS */}

                    <Route
                        path="/order-details/:id"
                        element={
                            <ProtectedRoute>
                                <OrderDetails />
                            </ProtectedRoute>
                        }
                    />


                    {/* ORDER CONFIRMATION */}

                    <Route
                        path="/order-confirmation/:orderId"
                        element={
                            <OrderConfirmation />
                        }
                    />


                    {/* =================================================
                        404
                    ================================================= */}

                    <Route
                        path="*"
                        element={<NotFound />}
                    />


                </Routes>

            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            <Footer />


        </div>

    );

}


export default App;