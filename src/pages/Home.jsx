import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchFilter from "../components/SearchFilter";
import FeaturedProducts from "../components/FeaturedProducts";

function Home({
  cartItems,
  wishlistItems,
  setWishlistItems,
  setCartItems,
  openCart,
}) {
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  return (
    <>
      <Navbar
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        openCart={openCart}
      />

      <Hero />

      <SearchFilter
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      <FeaturedProducts
        search={search}
        category={category}
        wishlistItems={wishlistItems}
        setWishlistItems={setWishlistItems}
        setCartItems={setCartItems}
      />
    </>
  );
}

export default Home;