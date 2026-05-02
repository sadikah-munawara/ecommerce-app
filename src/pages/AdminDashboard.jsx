import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Load data
  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

    const totalRevenue = savedOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    setRevenue(totalRevenue);

  }, []);

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setDarkMode(theme === "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Sidebar link style
  const linkStyle = {
    display: "block",
    margin: "15px 0",
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "16px"
  };

  return (

    <div style={{ display: "flex", height: "100vh" }}>

      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",

          // 🔥 Theme-based gradient
          background: "var(--bg-gradient)",

          color: "white",
          padding: "20px",
          height: "100vh"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <Link to="/admin" style={linkStyle}>Dashboard</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/analytics" style={linkStyle}>Analytics</Link>
      </div>

      {/* DASHBOARD */}
      <div
        style={{
          flex: 1,
          padding: "40px",

          //  Theme background
          background: "var(--bg-gradient)",
          color: "var(--text)"
        }}
      >

        <div style={{ maxWidth: "1000px", margin: "auto" }}>

          <h1>Admin Dashboard</h1>

          {/* KPI TILES */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px"
            }}
          >

            {/* CARD */}
            <div
              style={{
                padding: "20px",
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.15)",

                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                width: "220px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)"
              }}
            >
              <h3>Total Orders</h3>
              <h2>{orders.length}</h2>
            </div>

            {/* CARD */}
            <div
              style={{
                padding: "20px",
                background: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                width: "220px",
                border: darkMode
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)"
              }}
            >
              <h3>Total Revenue</h3>
              <h2>₹ {revenue}</h2>
            </div>

          </div>

          {/* RECENT ORDERS */}
          <div style={{ marginTop: "40px" }}>

            <h3>Recent Orders</h3>

            {orders.slice(0, 3).map((order) => (

              <div
                key={order.id}
                style={{
                  borderBottom: darkMode
                    ? "1px solid rgba(255,255,255,0.2)"
                    : "1px solid rgba(0,0,0,0.2)",
                  padding: "10px 0"
                }}
              >
                {order.id} — ₹{order.total}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;