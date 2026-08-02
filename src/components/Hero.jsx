import "../styles/Hero.css";

import heroImage from "../assets/images/hero/hero-curtain.jpg";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Luxury Curtains for Every Home</h1>

        <p>
          Transform your living space with premium curtains
          designed for elegance, comfort, and style.
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">Shop Now</button>

          <button className="collection-btn">
            View Collection
          </button>
        </div>

      </div>

      <div className="hero-image">

        <img
          src={heroImage}
          alt="Luxury Curtains"
        />

      </div>

    </section>
  );
}

export default Hero;