const API_URL = "http://localhost:5000/api/wishlist";


// GET WISHLIST
export const getWishlist = async (token) => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch wishlist"
        );
    }

    return data.wishlist;
};


// ADD TO WISHLIST
export const addToWishlist = async (
    token,
    productId
) => {
    const response = await fetch(
        `${API_URL}/add`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
                productId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to add product to wishlist"
        );
    }

    return data.wishlist;
};


// REMOVE FROM WISHLIST
export const removeFromWishlist = async (
    token,
    productId
) => {
    const response = await fetch(
        `${API_URL}/remove/${productId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to remove product from wishlist"
        );
    }

    return data.wishlist;
};


// CLEAR WISHLIST
export const clearWishlist = async (token) => {
    const response = await fetch(
        `${API_URL}/clear`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to clear wishlist"
        );
    }

    return data.wishlist;
};