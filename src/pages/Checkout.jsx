import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import {
    useProducts
} from "../context/ProductContext";


import OrderSummary from "../components/OrderSummary";


import "../styles/Checkout.css";



function Checkout(){



    const navigate = useNavigate();



    const {

        cartItems,

        setCartItems

    } = useProducts();






    const [shippingDetails,setShippingDetails] = useState({


        fullName:"",

        email:"",

        phone:"",

        country:"",

        city:"",

        address:""


    });





    const [error,setError] = useState("");



    const [loading,setLoading] = useState(false);







    const handleChange = (e)=>{


        setShippingDetails({


            ...shippingDetails,


            [e.target.name]:e.target.value


        });


    };









    const validateForm = ()=>{



        if(

            !shippingDetails.fullName ||

            !shippingDetails.email ||

            !shippingDetails.phone ||

            !shippingDetails.country ||

            !shippingDetails.city ||

            !shippingDetails.address

        ){


            return "Please fill in all fields";


        }






        const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





        if(!emailPattern.test(shippingDetails.email)){


            return "Please enter a valid email address";


        }







        if(shippingDetails.phone.length < 10){


            return "Please enter a valid phone number";


        }







        if(cartItems.length === 0){


            return "Your cart is empty";


        }





        return "";



    };









    const handleSubmit = (e)=>{


        e.preventDefault();




        const validationError = validateForm();




        if(validationError){


            setError(validationError);


            return;


        }






        setError("");

        setLoading(true);







        const order = {


            id:

            "ORDER-" + Date.now(),



            customer:

            shippingDetails,



            products:

            cartItems,



            total:

            cartItems.reduce(

                (sum,item)=>

                sum +

                (

                    item.price *

                    item.quantity

                ),

                0

            ),



            date:

            new Date().toLocaleString()


        };









        const existingOrders =

        JSON.parse(

            localStorage.getItem("orders")

        ) || [];







        localStorage.setItem(

            "orders",

            JSON.stringify(

                [

                    ...existingOrders,

                    order

                ]

            )

        );








        setCartItems([]);






        setTimeout(()=>{


            setLoading(false);



            navigate(

                `/order-confirmation/${order.id}`

            );



        },1000);




    };









    return (


        <div className="checkout-page">





            <h1>
                Checkout
            </h1>







            <div className="checkout-layout">






                <div className="shipping-form">





                    <h2>
                        Shipping Information
                    </h2>





                    {

                    error &&

                    <p className="checkout-error">

                        {error}

                    </p>

                    }







                    <form onSubmit={handleSubmit}>


                        <input

                        type="text"

                        name="fullName"

                        placeholder="Full Name"

                        value={shippingDetails.fullName}

                        onChange={handleChange}

                        />





                        <input

                        type="email"

                        name="email"

                        placeholder="Email Address"

                        value={shippingDetails.email}

                        onChange={handleChange}

                        />





                        <input

                        type="text"

                        name="phone"

                        placeholder="Phone Number"

                        value={shippingDetails.phone}

                        onChange={handleChange}

                        />





                        <input

                        type="text"

                        name="country"

                        placeholder="Country"

                        value={shippingDetails.country}

                        onChange={handleChange}

                        />





                        <input

                        type="text"

                        name="city"

                        placeholder="City"

                        value={shippingDetails.city}

                        onChange={handleChange}

                        />






                        <textarea

                        name="address"

                        placeholder="Delivery Address"

                        value={shippingDetails.address}

                        onChange={handleChange}

                        />







                        <button

                        type="submit"

                        className="place-order-btn"

                        disabled={loading}

                        >


                        {

                        loading

                        ?

                        "Processing..."

                        :

                        "Place Order"

                        }



                        </button>





                    </form>





                </div>









                <div className="order-summary-box">



                    <OrderSummary />



                </div>







            </div>





        </div>


    );


}



export default Checkout;