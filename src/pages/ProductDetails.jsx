import { useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaStar,
  FaMinus,
  FaPlus,
  FaHeart,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import products from "../data/products";

import "../styles/ProductDetails.css";

function ProductDetails({
  cartItems,
  wishlistItems,
  setWishlistItems,
  setCartItems,
  openCart,
}) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] =
    useState(1);

  if (!product) {
    return (
      <>
        <Navbar
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          openCart={openCart}
        />

        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Product Not Found
        </h2>
      </>
    );
  }

  const isWishlisted =
    wishlistItems.some(
      (item) => item.id === product.id
    );

  function toggleWishlist() {
    if (isWishlisted) {
      setWishlistItems((previous) =>
        previous.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlistItems((previous) => [
        ...previous,
        product,
      ]);
    }
  }

  function increaseQuantity() {
    setQuantity((previous) => previous + 1);
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((previous) => previous - 1);
    }
  }

  function addToCart() {
    setCartItems((previous) => {
      const existingItem = previous.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return previous.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity,
        },
      ];
    });

    setQuantity(1);
  }

  const relatedProducts = products.filter(
    (item) =>
      item.category === product.category &&
      item.id !== product.id
  );

  return (
    <>
      <Navbar
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        openCart={openCart}
      />

      <section className="product-details">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="details">
          <p className="breadcrumb">
            <Link to="/">Home</Link> /{" "}
            <Link to="/products">
              Products
            </Link>{" "}
            / {product.name}
          </p>

          <span className="badge">
            {product.badge}
          </span>

          <h1>{product.name}</h1>

          <p className="category">
            Category: {product.category}
          </p>

          <div className="rating">
            <FaStar />
            <span>{product.rating}</span>
            <small>
              ({product.reviews} Reviews)
            </small>
          </div>

          <div className="prices">
            <span className="new-price">
              ${product.price}
            </span>

            <span className="old-price">
              ${product.oldPrice}
            </span>
          </div>

          <p className="description">
            {product.description}
          </p>

          <div className="quantity">
            <button onClick={decreaseQuantity}>
              <FaMinus />
            </button>

            <span>{quantity}</span>

            <button onClick={increaseQuantity}>
              <FaPlus />
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <button
              className="add-btn"
              onClick={addToCart}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              className={`wishlist-button ${
                isWishlisted ? "active" : ""
              }`}
              onClick={toggleWishlist}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </section>

      <section className="related-products">
        <h2>Related Products</h2>

        <div className="products-grid">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              setCartItems={setCartItems}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;