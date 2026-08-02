import {

    useState

} from "react";


import {

    useNavigate

} from "react-router-dom";


import {

    useProducts

} from "../context/ProductContext";


import "../styles/Checkout.css";







function Checkout(){





    const navigate = useNavigate();








    const {

        cartItems

    } = useProducts();








    const [customer,setCustomer] =

    useState({


        fullName:"",

        email:"",

        phone:"",

        address:"",

        city:"",

        country:"Kenya"



    });









    const total =

    cartItems.reduce(



        (sum,item)=>


        sum +

        item.price *

        item.quantity,


        0



    );









    function handleChange(e){



        setCustomer({



            ...customer,



            [e.target.name]:

            e.target.value



        });



    }









    function continuePayment(e){



        e.preventDefault();







        localStorage.setItem(

            "checkoutCustomer",

            JSON.stringify(customer)

        );






        navigate("/payment");



    }









    return(



        <div className="checkout-page page-animation">







            <h1>

                Checkout

            </h1>









            <form

            className="checkout-form"

            onSubmit={continuePayment}

            >






                <input


                type="text"


                name="fullName"


                placeholder="Full Name"


                value={customer.fullName}


                onChange={handleChange}


                required


                />









                <input


                type="email"


                name="email"


                placeholder="Email"


                value={customer.email}


                onChange={handleChange}


                required


                />









                <input


                type="text"


                name="phone"


                placeholder="Phone Number"


                value={customer.phone}


                onChange={handleChange}


                required


                />









                <input


                type="text"


                name="address"


                placeholder="Address"


                value={customer.address}


                onChange={handleChange}


                required


                />









                <input


                type="text"


                name="city"


                placeholder="City"


                value={customer.city}


                onChange={handleChange}


                required


                />









                <select


                name="country"


                value={customer.country}


                onChange={handleChange}



                >



                    <option>

                        Kenya

                    </option>



                    <option>

                        Uganda

                    </option>



                    <option>

                        Tanzania

                    </option>



                </select>









                <div className="checkout-total">



                    <h2>

                        Total:

                        Ksh {total}

                    </h2>



                </div>








                <button

                type="submit"

                >

                    Continue To Payment

                </button>








            </form>







        </div>



    );


}





export default Checkout;