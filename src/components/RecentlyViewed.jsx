import {
    useEffect,
    useState
} from "react";


import {
    Link
} from "react-router-dom";


import "../styles/RecentlyViewed.css";





function RecentlyViewed(){



    const [products,setProducts] =

    useState([]);








    useEffect(()=>{


        const savedProducts =

        JSON.parse(

            localStorage.getItem(

                "recentProducts"

            )

        ) || [];





        setProducts(savedProducts);



    },[]);









    if(products.length===0){


        return null;


    }









    return(



        <section className="recent-section">





            <h2>

                Recently Viewed

            </h2>







            <div className="recent-grid">






                {

                products.map(product=>(



                    <div

                    className="recent-card"

                    key={product.id}

                    >







                        <Link

                        to={`/products/${product.id}`}

                        >



                            <img


                            src={product.image}


                            alt={product.name}


                            />



                        </Link>








                        <h3>


                            {product.name}


                        </h3>








                        <p>


                            Ksh {product.price}


                        </p>








                        <Link

                        className="view-btn"

                        to={`/products/${product.id}`}

                        >


                            View Product


                        </Link>







                    </div>




                ))



                }







            </div>







        </section>



    );


}





export default RecentlyViewed;