
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getProducts
} from "../services/productService";

import {
    getCart,
    addToCart as addProductToCart,
    updateCartItem,
    removeFromCart as removeProductFromCart,
    clearCart as clearBackendCart
} from "../services/cartService";

import {
    getWishlist,
    addToWishlist as addProductToWishlist,
    removeFromWishlist as removeProductFromWishlist,
    clearWishlist as clearBackendWishlist
} from "../services/wishlistService";

import { useAuth } from "./AuthContext";


const ProductContext = createContext();


export function ProductProvider({ children }) {

    // =====================================================
    // PRODUCTS
    // =====================================================

    const [products, setProducts] = useState([]);


    // =====================================================
    // LOADING STATE
    // =====================================================

    const [loading, setLoading] = useState(true);


    // =====================================================
    // ERROR STATE
    // =====================================================

    const [error, setError] = useState(null);


    // =====================================================
    // SEARCH
    // =====================================================

    const [search, setSearch] = useState("");


    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const {
        user,
        loading: authLoading
    } = useAuth();


    // =====================================================
    // CART
    // =====================================================

    const [cartItems, setCartItems] = useState([]);

    const [cartLoading, setCartLoading] =
        useState(false);

    const [cartError, setCartError] =
        useState(null);


    // =====================================================
    // WISHLIST
    // =====================================================

    const [wishlistItems, setWishlistItems] =
        useState([]);

    const [wishlistLoading, setWishlistLoading] =
        useState(false);

    const [wishlistError, setWishlistError] =
        useState(null);


    // =====================================================
    // GET AUTHENTICATION TOKEN
    // =====================================================

    const getToken = () => {
        return localStorage.getItem("token");
    };


    // =====================================================
    // FETCH PRODUCTS FROM BACKEND
    // =====================================================

    const loadProducts = async () => {

        try {

            setLoading(true);

            setError(null);

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            console.error(
                "Failed to load products:",
                error
            );

            setError(
                "Failed to load products. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD PRODUCTS WHEN APP STARTS
    // =====================================================

    useEffect(() => {

        loadProducts();

    }, []);


    // =====================================================
    // LOAD CART FROM BACKEND
    // =====================================================

    const loadCart = async () => {

        const token = getToken();


        // User is not logged in
        if (!token) {

            setCartItems([]);

            setCartError(null);

            setCartLoading(false);

            return;
        }


        try {

            setCartLoading(true);

            setCartError(null);


            const cart = await getCart(token);

            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(formattedItems);

        } catch (error) {

            console.error(
                "Failed to load cart:",
                error
            );

            setCartError(
                error.message ||
                "Failed to load cart."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // LOAD CART WHEN USER IS AUTHENTICATED
    // =====================================================

    useEffect(() => {

        if (authLoading) {
            return;
        }


        if (user) {

            loadCart();

        } else {

            setCartItems([]);

            setCartError(null);

            setCartLoading(false);

        }

    }, [user, authLoading]);


    // =====================================================
    // LOAD WISHLIST FROM BACKEND
    // =====================================================

    const loadWishlist = async () => {

        const token = getToken();


        // User is not logged in
        if (!token) {

            setWishlistItems([]);

            setWishlistError(null);

            setWishlistLoading(false);

            return;
        }


        try {

            setWishlistLoading(true);

            setWishlistError(null);


            const wishlist =
                await getWishlist(token);


            const backendProducts =
                wishlist?.products || [];


            const formattedWishlist =
                backendProducts
                    .filter(
                        product => product
                    )
                    .map(
                        product => ({
                            ...product,
                            id: product._id
                        })
                    );


            setWishlistItems(
                formattedWishlist
            );

        } catch (error) {

            console.error(
                "Failed to load wishlist:",
                error
            );

            setWishlistError(
                error.message ||
                "Failed to load wishlist."
            );

        } finally {

            setWishlistLoading(false);

        }
    };


    // =====================================================
    // LOAD WISHLIST WHEN USER IS AUTHENTICATED
    // =====================================================

    useEffect(() => {

        if (authLoading) {
            return;
        }


        if (user) {

            loadWishlist();

        } else {

            setWishlistItems([]);

            setWishlistError(null);

            setWishlistLoading(false);

        }

    }, [user, authLoading]);


    // =====================================================
    // ADD TO CART
    // =====================================================

    const addToCart = async (
        product,
        quantity = 1
    ) => {

        const token = getToken();


        // User must be logged in
        if (!token) {

            setCartError(
                "Please login to add products to your cart."
            );

            return;
        }


        const quantityToAdd =
            Number(quantity) > 0
                ? Number(quantity)
                : 1;


        try {

            setCartLoading(true);

            setCartError(null);


            const cart =
                await addProductToCart(
                    token,
                    product.id || product._id,
                    quantityToAdd
                );


            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(
                formattedItems
            );

        } catch (error) {

            console.error(
                "Failed to add product to cart:",
                error
            );

            setCartError(
                error.message ||
                "Failed to add product to cart."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // REMOVE FROM CART
    // =====================================================

    const removeFromCart = async (id) => {

        const token = getToken();


        if (!token) {

            setCartError(
                "Please login to manage your cart."
            );

            return;
        }


        try {

            setCartLoading(true);

            setCartError(null);


            const cart =
                await removeProductFromCart(
                    token,
                    id
                );


            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(
                formattedItems
            );

        } catch (error) {

            console.error(
                "Failed to remove product from cart:",
                error
            );

            setCartError(
                error.message ||
                "Failed to remove product from cart."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // INCREASE CART QUANTITY
    // =====================================================

    const increaseQuantity = async (id) => {

        const token = getToken();


        if (!token) {

            setCartError(
                "Please login to manage your cart."
            );

            return;
        }


        const currentItem =
            cartItems.find(
                item => item.id === id
            );


        if (!currentItem) {
            return;
        }


        const newQuantity =
            (Number(currentItem.quantity) || 1) + 1;


        try {

            setCartLoading(true);

            setCartError(null);


            const cart =
                await updateCartItem(
                    token,
                    id,
                    newQuantity
                );


            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(
                formattedItems
            );

        } catch (error) {

            console.error(
                "Failed to increase quantity:",
                error
            );

            setCartError(
                error.message ||
                "Failed to increase quantity."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // DECREASE CART QUANTITY
    // =====================================================

    const decreaseQuantity = async (id) => {

        const token = getToken();


        if (!token) {

            setCartError(
                "Please login to manage your cart."
            );

            return;
        }


        const currentItem =
            cartItems.find(
                item => item.id === id
            );


        if (!currentItem) {
            return;
        }


        const currentQuantity =
            Number(currentItem.quantity) || 1;


        // Don't allow quantity below 1
        if (currentQuantity <= 1) {
            return;
        }


        const newQuantity =
            currentQuantity - 1;


        try {

            setCartLoading(true);

            setCartError(null);


            const cart =
                await updateCartItem(
                    token,
                    id,
                    newQuantity
                );


            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(
                formattedItems
            );

        } catch (error) {

            console.error(
                "Failed to decrease quantity:",
                error
            );

            setCartError(
                error.message ||
                "Failed to decrease quantity."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // CLEAR CART
    // =====================================================

    const clearCart = async () => {

        const token = getToken();


        if (!token) {

            setCartItems([]);

            return;
        }


        try {

            setCartLoading(true);

            setCartError(null);


            const cart =
                await clearBackendCart(
                    token
                );


            const backendItems =
                cart?.items || [];


            const formattedItems =
                backendItems
                    .filter(
                        item => item.product
                    )
                    .map(
                        item => ({
                            ...item.product,
                            id: item.product._id,
                            quantity: item.quantity
                        })
                    );


            setCartItems(
                formattedItems
            );

        } catch (error) {

            console.error(
                "Failed to clear cart:",
                error
            );

            setCartError(
                error.message ||
                "Failed to clear cart."
            );

        } finally {

            setCartLoading(false);

        }
    };


    // =====================================================
    // ADD TO WISHLIST
    // =====================================================

    const addToWishlist = async (product) => {

        const token = getToken();


        if (!token) {

            setWishlistError(
                "Please login to add products to your wishlist."
            );

            return;
        }


        try {

            setWishlistLoading(true);

            setWishlistError(null);


            const wishlist =
                await addProductToWishlist(
                    token,
                    product.id || product._id
                );


            const backendProducts =
                wishlist?.products || [];


            const formattedWishlist =
                backendProducts
                    .filter(
                        item => item
                    )
                    .map(
                        item => ({
                            ...item,
                            id: item._id
                        })
                    );


            setWishlistItems(
                formattedWishlist
            );

        } catch (error) {

            console.error(
                "Failed to add product to wishlist:",
                error
            );

            setWishlistError(
                error.message ||
                "Failed to add product to wishlist."
            );

        } finally {

            setWishlistLoading(false);

        }
    };


    // =====================================================
    // REMOVE FROM WISHLIST
    // =====================================================

    const removeFromWishlist = async (id) => {

        const token = getToken();


        if (!token) {

            setWishlistError(
                "Please login to manage your wishlist."
            );

            return;
        }


        try {

            setWishlistLoading(true);

            setWishlistError(null);


            const wishlist =
                await removeProductFromWishlist(
                    token,
                    id
                );


            const backendProducts =
                wishlist?.products || [];


            const formattedWishlist =
                backendProducts
                    .filter(
                        item => item
                    )
                    .map(
                        item => ({
                            ...item,
                            id: item._id
                        })
                    );


            setWishlistItems(
                formattedWishlist
            );

        } catch (error) {

            console.error(
                "Failed to remove product from wishlist:",
                error
            );

            setWishlistError(
                error.message ||
                "Failed to remove product from wishlist."
            );

        } finally {

            setWishlistLoading(false);

        }
    };


    // =====================================================
    // CLEAR WISHLIST
    // =====================================================

    const clearWishlist = async () => {

        const token = getToken();


        if (!token) {

            setWishlistItems([]);

            return;
        }


        try {

            setWishlistLoading(true);

            setWishlistError(null);


            const wishlist =
                await clearBackendWishlist(
                    token
                );


            const backendProducts =
                wishlist?.products || [];


            const formattedWishlist =
                backendProducts
                    .filter(
                        item => item
                    )
                    .map(
                        item => ({
                            ...item,
                            id: item._id
                        })
                    );


            setWishlistItems(
                formattedWishlist
            );

        } catch (error) {

            console.error(
                "Failed to clear wishlist:",
                error
            );

            setWishlistError(
                error.message ||
                "Failed to clear wishlist."
            );

        } finally {

            setWishlistLoading(false);

        }
    };


    // =====================================================
    // FILTER PRODUCTS
    // =====================================================

    const filteredProducts =
        products.filter(
            product =>
                product.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );


    // =====================================================
    // PROVIDER
    // =====================================================

    return (

        <ProductContext.Provider
            value={{

                // =================================================
                // PRODUCTS
                // =================================================

                products,

                setProducts,

                filteredProducts,


                // =================================================
                // LOADING
                // =================================================

                loading,

                setLoading,

                loadProducts,


                // =================================================
                // ERROR
                // =================================================

                error,


                // =================================================
                // SEARCH
                // =================================================

                search,

                setSearch,


                // =================================================
                // CART
                // =================================================

                cartItems,

                setCartItems,

                addToCart,

                removeFromCart,

                increaseQuantity,

                decreaseQuantity,

                clearCart,


                // =================================================
                // CART LOADING / ERROR
                // =================================================

                cartLoading,

                cartError,

                loadCart,


                // =================================================
                // WISHLIST
                // =================================================

                wishlistItems,

                addToWishlist,

                removeFromWishlist,

                clearWishlist,


                // =================================================
                // WISHLIST LOADING / ERROR
                // =================================================

                wishlistLoading,

                wishlistError,

                loadWishlist

            }}
        >

            {children}

        </ProductContext.Provider>

    );
}


export function useProducts() {

    return useContext(ProductContext);

}

