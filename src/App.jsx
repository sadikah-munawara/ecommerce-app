import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "./data/products";

import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Analytics from "./pages/Analytics";

function App() {

  const [role, setRole] = useState("admin");

  // ================= CART =================
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {

      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    showNotification(`${product?.title || "Item"} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ================= WISHLIST =================
  const [wishlist, setWishlist] = useState(() => {
  const saved = localStorage.getItem("wishlist");
  const parsed = saved ? JSON.parse(saved) : [];
  return parsed.filter((item) => item && item.id); 
});

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {

  setWishlist((prev) => {

    const exists = prev.find((item) => item.id === product.id);

    if (exists) {
      showNotification(`${product.title} removed from wishlist`);
      return prev.filter((item) => item.id !== product.id);
    } else {
      showNotification(`${product.title} added to wishlist`);
      return [...prev, product];
    }

  });

};
  // ================= NOTIFICATIONS =================
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message) => {

    const id = Date.now();

    setNotifications((prev) => {

    // prevent duplicate messages
    if (prev.some((n) => n.message === message)) {
      return prev;
    }

    return [...prev, { id, message }];
  });

  setTimeout(() => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  }, 2000); 
};
  // ================= UI =================
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <Navbar
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />

      <div style={{ flex: 1 }}>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={
              <Products
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                setCart={setCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={<Checkout cart={cart} setCart={setCart} />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/orders" element={<Orders />} />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/admin"
            element={
              <AdminRoute role={role}>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
  path="/analytics"
  element={
    <AdminRoute role={role}>
      <Analytics />
    </AdminRoute>
  }
/>

        </Routes>

      </div>

      {/* NOTIFICATIONS */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 999
        }}
      >
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              background: "#4c5369",
              color: "white",
              padding: "10px 20px",
              marginBottom: "10px",
              borderRadius: "6px"
            }}
          >
            {n.message}
          </div>
        ))}
      </div>

      <Footer />

    </div>
  );
}

export default App;