const API_URL = "http://localhost:5000/api/products";


// =====================================================
// GET ALL PRODUCTS
// =====================================================

export const getProducts = async () => {

    const response = await fetch(API_URL);


    if (!response.ok) {

        throw new Error(
            "Failed to fetch products"
        );

    }


    const data = await response.json();


    return data.map(product => ({

        ...product,

        id: product._id

    }));

};


// =====================================================
// GET ONE PRODUCT
// =====================================================

export const getProductById = async (id) => {

    const response = await fetch(
        `${API_URL}/${id}`
    );


    if (!response.ok) {

        throw new Error(
            "Failed to fetch product"
        );

    }


    const product = await response.json();


    return {

        ...product,

        id: product._id

    };

};