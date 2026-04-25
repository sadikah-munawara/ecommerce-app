import { NavLink } from "react-router-dom";

function Navbar({ cartCount, wishlistCount, darkMode, setDarkMode, setShowCart }) {

  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#b652b9" : "#333",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <nav
      aria-label="Main Navigation"
      style={{
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        background: "#f4f4f4"
      }}
    >

   <h2
  style={{
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
    background: "linear-gradient(90deg, #c084fc, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  MyStore
</h2>
      <div style={{ display: "flex", gap: "20px" }}>

        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/products" style={linkStyle}>
          Products
        </NavLink>

        <NavLink to="/wishlist" style={linkStyle}>
          Wishlist ({wishlistCount})
        </NavLink>

        <NavLink to="/cart" style={linkStyle}>
          Cart ({cartCount})
        </NavLink>

        <NavLink to="/profile" style={linkStyle}>
  Profile
</NavLink>

<NavLink to="/orders" style={linkStyle}>
  Orders
</NavLink>

<NavLink to="/admin" style={linkStyle}>
  Admin
</NavLink>

      </div>

    </nav>
  );
}

export default Navbar;