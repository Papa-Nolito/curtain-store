import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


import productsData from "../data/products";



const ProductContext = createContext();





export function ProductProvider({children}){



    // Products

    const [products,setProducts] = useState(
        productsData
    );



    // Search

    const [search,setSearch] = useState("");




    // Cart

    const [cartItems,setCartItems] = useState(()=>{


        const savedCart =
        localStorage.getItem("cart");


        return savedCart
        ? JSON.parse(savedCart)
        : [];


    });





    // Wishlist

    const [wishlist,setWishlist] = useState(()=>{


        const savedWishlist =
        localStorage.getItem("wishlist");


        return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];


    });







    // Save cart whenever it changes


    useEffect(()=>{


        localStorage.setItem(

            "cart",

            JSON.stringify(cartItems)

        );


    },[cartItems]);








    // Save wishlist whenever it changes


    useEffect(()=>{


        localStorage.setItem(

            "wishlist",

            JSON.stringify(wishlist)

        );


    },[wishlist]);









    // Add product to cart


    const addToCart = (product)=>{


        const existingProduct =

        cartItems.find(

            item=>item.id === product.id

        );




        if(existingProduct){



            setCartItems(

                cartItems.map(item=>

                    item.id === product.id

                    ?

                    {

                        ...item,

                        quantity:item.quantity + 1

                    }

                    :

                    item

                )

            );



        }


        else{


            setCartItems([

                ...cartItems,

                {

                    ...product,

                    quantity:1

                }

            ]);


        }



    };









    // Remove from cart


    const removeFromCart = (id)=>{


        setCartItems(

            cartItems.filter(

                item=>item.id !== id

            )

        );


    };








    // Increase quantity


    const increaseQuantity = (id)=>{


        setCartItems(

            cartItems.map(item=>


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









    // Decrease quantity


    const decreaseQuantity = (id)=>{


        setCartItems(

            cartItems.map(item=>{


                if(item.id === id){


                    return {


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









    // Add to wishlist


    const addToWishlist = (product)=>{


        const exists =

        wishlist.some(

            item=>item.id === product.id

        );



        if(!exists){


            setWishlist([

                ...wishlist,

                product

            ]);

        }


    };








    // Remove from wishlist


    const removeFromWishlist = (id)=>{


        setWishlist(

            wishlist.filter(

                item=>item.id !== id

            )

        );


    };









    // Search filtering


    const filteredProducts =

    products.filter(product=>

        product.name

        .toLowerCase()

        .includes(

            search.toLowerCase()

        )

    );









    return (

        <ProductContext.Provider

        value={{

            products,

            filteredProducts,


            search,

            setSearch,


            cartItems,

            setCartItems,

            addToCart,

            removeFromCart,

            increaseQuantity,

            decreaseQuantity,



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