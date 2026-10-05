import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    useProducts
} from "../context/ProductContext";


import {
    useAuth
} from "../context/AuthContext";


import {
    createOrder
} from "../services/orderService";


import "../styles/Checkout.css";



function Checkout() {


    const navigate = useNavigate();


    const {
        cartItems
    } = useProducts();


    const {
        user
    } = useAuth();


    const [customer, setCustomer] =
        useState({

            fullName: user?.name || "",

            email: user?.email || "",

            phone: "",

            address: "",

            city: "",

            country: "Kenya"

        });


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState(null);



    // =====================================================
    // CALCULATE DISPLAY TOTAL
    // =====================================================

    const total =
        cartItems.reduce(

            (sum, item) =>

                sum +
                item.price *
                item.quantity,

            0

        );



    // =====================================================
    // HANDLE INPUT CHANGES
    // =====================================================

    function handleChange(e) {

        setCustomer({

            ...customer,

            [e.target.name]:
                e.target.value

        });

    }



    // =====================================================
    // CONTINUE TO PAYMENT
    // =====================================================

    async function continuePayment(e) {

        e.preventDefault();


        setError(null);


        // =====================================================
        // CHECK USER
        // =====================================================

        if (!user) {

            navigate("/login");

            return;

        }


        // =====================================================
        // CHECK CART
        // =====================================================

        if (
            !cartItems ||
            cartItems.length === 0
        ) {

            setError(
                "Your cart is empty."
            );

            return;

        }


        // =====================================================
        // GET TOKEN
        // =====================================================

        const token =
            localStorage.getItem(
                "token"
            );


        if (!token) {

            navigate("/login");

            return;

        }


        // =====================================================
        // START LOADING
        // =====================================================

        setLoading(true);


        try {


            // =================================================
            // CREATE ORDER THROUGH BACKEND
            // =================================================

            const order =
                await createOrder(

                    token,

                    {

                        shippingAddress: {

                            fullName:
                                customer.fullName,

                            phone:
                                customer.phone,

                            address:
                                customer.address,

                            city:
                                customer.city

                        },

                        paymentMethod:
                            "Cash on Delivery"

                    }

                );


            // =================================================
            // SAVE CUSTOMER INFORMATION
            // =================================================

            localStorage.setItem(

                "checkoutCustomer",

                JSON.stringify(
                    customer
                )

            );


            // =================================================
            // SAVE ORDER ID
            // =================================================

            localStorage.setItem(

                "currentOrderId",

                order._id

            );


            // =================================================
            // MOVE TO PAYMENT PAGE
            // =================================================

            navigate(
                `/payment?orderId=${order._id}`
            );


        } catch (error) {


            console.error(
                "Checkout error:",
                error
            );


            setError(

                error.message ||
                "Something went wrong while creating your order."

            );


        } finally {

            setLoading(false);

        }

    }



    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="checkout-page page-animation">


            <h1>
                Checkout
            </h1>


            {error && (

                <div className="checkout-error">

                    {error}

                </div>

            )}



            <form
                className="checkout-form"
                onSubmit={continuePayment}
            >


                {/* FULL NAME */}

                <input

                    type="text"

                    name="fullName"

                    placeholder="Full Name"

                    value={
                        customer.fullName
                    }

                    onChange={
                        handleChange
                    }

                    required

                />



                {/* EMAIL */}

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={
                        customer.email
                    }

                    onChange={
                        handleChange
                    }

                    required

                />



                {/* PHONE */}

                <input

                    type="text"

                    name="phone"

                    placeholder="Phone Number"

                    value={
                        customer.phone
                    }

                    onChange={
                        handleChange
                    }

                    required

                />



                {/* ADDRESS */}

                <input

                    type="text"

                    name="address"

                    placeholder="Address"

                    value={
                        customer.address
                    }

                    onChange={
                        handleChange
                    }

                    required

                />



                {/* CITY */}

                <input

                    type="text"

                    name="city"

                    placeholder="City"

                    value={
                        customer.city
                    }

                    onChange={
                        handleChange
                    }

                    required

                />



                {/* COUNTRY */}

                <select

                    name="country"

                    value={
                        customer.country
                    }

                    onChange={
                        handleChange
                    }

                >

                    <option value="Kenya">
                        Kenya
                    </option>

                    <option value="Uganda">
                        Uganda
                    </option>

                    <option value="Tanzania">
                        Tanzania
                    </option>

                </select>



                {/* TOTAL */}

                <div className="checkout-total">

                    <h2>

                        Total:

                        Ksh{" "}

                        {total.toLocaleString()}

                    </h2>

                </div>



                {/* ERROR */}

                {error && (

                    <p className="checkout-error">

                        {error}

                    </p>

                )}



                {/* SUBMIT */}

                <button

                    type="submit"

                    disabled={loading}

                >

                    {loading
                        ? "Creating Order..."
                        : "Continue To Payment"
                    }

                </button>


            </form>


        </div>

    );

}


export default Checkout;