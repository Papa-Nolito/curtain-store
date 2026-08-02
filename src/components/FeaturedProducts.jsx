import "../styles/FeaturedProducts.css";

import ProductCard from "./ProductCard";
import products from "../data/products";

function FeaturedProducts({
  search,
  category,
  wishlistItems,
  setWishlistItems,
  setCartItems,
}) {
  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    }
  );

  return (
    <section className="featured-products">
      <h2>Featured Curtains</h2>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No curtains found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              setCartItems={setCartItems}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;