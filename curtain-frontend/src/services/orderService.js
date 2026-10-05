const API_URL = "http://localhost:5000/api/orders";

// CREATE ORDER
export const createOrder = async (token, orderData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create order"
        );
    }

    return data.order;
};

// GET MY ORDERS
export const getMyOrders = async (token) => {
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch orders"
        );
    }

    return data.orders;
};

// GET SINGLE ORDER
export const getOrderById = async (token, orderId) => {
    const response = await fetch(
        `${API_URL}/${orderId}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to fetch order"
        );
    }

    return data.order;
};

// SIMULATE PAYMENT
export const simulatePayment = async (
    token,
    orderId,
    paymentMethod
) => {
    const cleanedPaymentMethod =
        String(paymentMethod).trim();

    console.log(
        "Sending payment method to backend:",
        cleanedPaymentMethod
    );

    const response = await fetch(
        `${API_URL}/${orderId}/pay`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                paymentMethod: cleanedPaymentMethod,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Payment failed"
        );
    }

    return data.order;
};
