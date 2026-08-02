import {
    Routes,
    Route
} from "react-router-dom";



import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";



import Home from "./pages/Home";

import Products from "./pages/Products";

import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ForgotPassword from "./pages/ForgotPassword";

import Profile from "./pages/Profile";

import Checkout from "./pages/Checkout";

import OrderConfirmation from "./pages/OrderConfirmation";



import "./index.css";





function App(){


    return (


        <>


            <Navbar />



            <Routes>





                {/* Public Routes */}



                <Route

                path="/"

                element={<Home />}

                />





                <Route

                path="/products"

                element={<Products />}

                />





                <Route

                path="/products/:id"

                element={<ProductDetails />}

                />





                <Route

                path="/cart"

                element={<Cart />}

                />






                <Route

                path="/login"

                element={<Login />}

                />






                <Route

                path="/register"

                element={<Register />}

                />






                <Route

                path="/forgot-password"

                element={<ForgotPassword />}

                />







                {/* Protected Routes */}



                <Route

                path="/profile"

                element={


                    <ProtectedRoute>


                        <Profile />


                    </ProtectedRoute>


                }

                />








                <Route

                path="/checkout"

                element={


                    <ProtectedRoute>


                        <Checkout />


                    </ProtectedRoute>


                }

                />









                {/* Order Confirmation */}



                <Route

                path="/order-confirmation/:orderId"

                element={<OrderConfirmation />}

                />









                {/* 404 */}



                <Route

                path="*"

                element={


                    <h1>

                        404 - Page Not Found

                    </h1>


                }

                />





            </Routes>



        </>


    );


}



export default App;