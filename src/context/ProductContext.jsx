import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import productsData from "../data/products";



const ProductContext = createContext();






export function ProductProvider({children}){





    // PRODUCTS


    const [products,setProducts] = useState(
        productsData
    );






    // LOADING STATE


    const [loading,setLoading] = useState(false);







    // SEARCH


    const [search,setSearch] = useState("");








    // CART


    const [cartItems,setCartItems] = useState(()=>{


        const savedCart =

        localStorage.getItem("cart");



        return savedCart

        ? JSON.parse(savedCart)

        : [];



    });









    // WISHLIST


    const [wishlist,setWishlist] = useState(()=>{


        const savedWishlist =

        localStorage.getItem("wishlist");



        return savedWishlist

        ? JSON.parse(savedWishlist)

        : [];



    });









    // SAVE CART


    useEffect(()=>{


        localStorage.setItem(

            "cart",

            JSON.stringify(cartItems)

        );


    },[cartItems]);









    // SAVE WISHLIST


    useEffect(()=>{


        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );


    },[wishlist]);














    // ADD TO CART


    const addToCart = (product)=>{


        setCartItems(previous=>{


            const existingProduct =

            previous.find(

                item=>item.id === product.id

            );







            if(existingProduct){



                return previous.map(item=>



                    item.id === product.id

                    ?


                    {

                        ...item,

                        quantity:

                        item.quantity + 1

                    }


                    :


                    item



                );



            }







            return [


                ...previous,


                {


                    ...product,


                    quantity:1


                }



            ];



        });



    };












    // REMOVE FROM CART


    const removeFromCart = (id)=>{


        setCartItems(previous=>



            previous.filter(

                item=>item.id !== id

            )



        );


    };













    // INCREASE QUANTITY


    const increaseQuantity = (id)=>{


        setCartItems(previous=>


            previous.map(item=>


                item.id === id


                ?


                {


                    ...item,


                    quantity:item.quantity + 1


                }


                :


                item



            )


        );


    };













    // DECREASE QUANTITY


    const decreaseQuantity = (id)=>{


        setCartItems(previous=>


            previous.map(item=>{


                if(item.id === id){


                    return{


                        ...item,


                        quantity:

                        item.quantity > 1

                        ?

                        item.quantity - 1

                        :

                        1



                    };


                }



                return item;



            })

        );


    };













    // CLEAR CART AFTER PAYMENT


    const clearCart = ()=>{


        setCartItems([]);


    };













    // ADD WISHLIST


    const addToWishlist = (product)=>{


        setWishlist(previous=>{


            const exists =

            previous.some(

                item=>item.id === product.id

            );





            if(exists){


                return previous;


            }





            return [


                ...previous,


                product


            ];



        });



    };












    // REMOVE WISHLIST


    const removeFromWishlist = (id)=>{


        setWishlist(previous=>


            previous.filter(

                item=>item.id !== id

            )


        );


    };












    // FILTER PRODUCTS


    const filteredProducts =

    products.filter(product=>


        product.name

        .toLowerCase()

        .includes(

            search.toLowerCase()

        )


    );













    return(



        <ProductContext.Provider


        value={{



            products,

            setProducts,



            filteredProducts,



            loading,

            setLoading,



            search,

            setSearch,



            cartItems,

            setCartItems,

            addToCart,

            removeFromCart,

            increaseQuantity,

            decreaseQuantity,

            clearCart,



            wishlist,

            addToWishlist,

            removeFromWishlist



        }}


        >



            {children}



        </ProductContext.Provider>



    );



}









export function useProducts(){



    return useContext(ProductContext);



}