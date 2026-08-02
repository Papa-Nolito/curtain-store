import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import "../styles/Wishlist.css";

function Wishlist({
  wishlistItems,
  setWishlistItems,
  cartItems,
  setCartItems,
  openCart,
}) {
  return (
    <>
      <Navbar
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        openCart={openCart}
      />

      <section className="wishlist-page">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>

          <p>
            {wishlistItems.length} Item
            {wishlistItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty ❤️</h2>

            <p>
              Start adding your favourite curtains.
            </p>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Wishlist;