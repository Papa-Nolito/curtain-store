const API_URL = "http://localhost:5000/api/cart";

// GET LOGGED-IN USER'S CART
export const getCart = async (token) => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart");
  }

  return data.cart;
};

// ADD PRODUCT TO CART
export const addToCart = async (token, productId, quantity = 1) => {
  const response = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product to cart");
  }

  return data.cart;
};

// UPDATE CART ITEM QUANTITY
export const updateCartItem = async (token, productId, quantity) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update cart");
  }

  return data.cart;
};

// REMOVE PRODUCT FROM CART
export const removeFromCart = async (token, productId) => {
  const response = await fetch(`${API_URL}/remove/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove product from cart");
  }

  return data.cart;
};

// CLEAR CART
export const clearCart = async (token) => {
  const response = await fetch(`${API_URL}/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to clear cart");
  }

  return data.cart;
};