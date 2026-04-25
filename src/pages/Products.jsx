import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/api";
import "../App.css";

function Products({ addToCart, wishlist, toggleWishlist }) {

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 4;

  // 🔄 Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🌐 Fetch Products
  useEffect(() => {

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

  }, []);

  // 🔍 Filter Products
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // 📄 Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ⏳ Loading UI
  if (loading) {
    return <h2 className="center-text">Loading products...</h2>;
  }

  // ❌ Error UI
  if (error) {
    return <h2 className="center-text">{error}</h2>;
  }

  return (
    <div className="container">

      <h2 className="page-title" style={{ background: "linear-gradient(90deg, #c084fc, #7c3aed)", WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"}}>Our Products</h2>

      {/* 🔍 SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* ❌ No Results */}
      {filteredProducts.length === 0 && (
        <h3 className="center-text">No products found</h3>
      )}

      {/* 🛍️ PRODUCT GRID */}
      <div className="product-grid">

        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}

      </div>

      {/* 📄 PAGINATION */}
      <div className="pagination">

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}

      </div>

    </div>
  );
}

export default Products;