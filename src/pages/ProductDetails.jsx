import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ProductDetails({ addToCart }) {

  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [showFull, setShowFull] = useState(false);

  if (!product) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Product Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "60px 40px",
        maxWidth: "1000px",
        margin: "auto",
        position: "relative"
      }}
    >

      {/* ❌  CLOSE BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s"
        }}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(239,68,68,0.9)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(255,255,255,0.15)";
        }}
      >
        ✕
      </button>

      <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>

        {/* IMAGE */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px"
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* DETAILS */}
        <div style={{ color: "#f1f5f9" }}>

          <h2 style={{ marginBottom: "8px" }}>
            {product.title}
          </h2>

          {/* CATEGORY */}
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              color: "#e2e8f0"
            }}
          >
            {product.category || "General"}
          </span>

          {/* RATING */}
          <p style={{ marginTop: "12px" }}>
            ⭐ {product.rating?.rate || product.rating || 4}
          </p>

          {/* PRICE */}
          <h3 style={{ marginTop: "5px" }}>
            ₹ {product.price}
          </h3>

          {/* DESCRIPTION */}
          <p
            style={{
              marginTop: "15px",
              lineHeight: "1.6",
              maxWidth: "450px",
              color: "#e2e8f0",
              fontSize: "14px"
            }}
          >
            {showFull
              ? product.description
              : product.description?.slice(0, 120) + "..."}

            {product.description && product.description.length > 120 && (
              <span
                onClick={() => setShowFull(!showFull)}
                style={{
                  color: "#93c5fd",
                  cursor: "pointer",
                  marginLeft: "6px",
                  fontWeight: "normal",
                  fontSize: "13px"
                }}
              >
                {showFull ? "Show less" : "Read more"}
              </span>
            )}
          </p>

          {/* QUANTITY */}
          <div style={{ margin: "20px 0" }}>
            <button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#e5e7eb",
                cursor: "pointer"
              }}
            >
              -
            </button>

            <span style={{ margin: "0 15px" }}>{quantity}</span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#e5e7eb",
                cursor: "pointer"
              }}
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart({ ...product, quantity })}
            style={{
              padding: "10px 25px",
              backgroundColor: "#111827",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;