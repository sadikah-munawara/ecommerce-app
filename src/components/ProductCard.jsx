import { Link } from "react-router-dom";
import React from "react";
import "./ProductCard.css";

function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {

  const safeWishlist = wishlist.filter((item) => item && item.id);

  
  const isWishlisted = safeWishlist.some(
    (item) => item.id === product.id
  );

  return (
    <div className="product-card">

      {/* ❤️ WISHLIST BUTTON */}
      <button
        className="wishlist-btn"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);   
        }}
      >
        {isWishlisted ? "❤️" : "🤍"}
      </button>

      {/* PRODUCT IMAGE */}
      <img src={product.image} alt={product.title} />

      {/* PRODUCT TITLE */}
      <Link
        to={`/product/${product.id}`}
        state={{ product }}
        className="product-title"
      >
        <h3>{product.title}</h3>
      </Link>

      {/* PRICE */}
      <p className="price">₹ {product.price}</p>

      {/* ADD TO CART */}
      <button
        className="add-btn"
        onClick={(e) => {
          e.stopPropagation();
          addToCart({ ...product, quantity: 1 });
        }}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default React.memo(ProductCard);