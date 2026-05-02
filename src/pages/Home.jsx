import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.png";

function Home() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes moveBg {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "80px 60px",
          borderRadius: "12px",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          background: "var(--bg-gradient)",
          backgroundSize: "400% 400%",
          animation: "moveBg 12s ease infinite",
        }}
      >

        {/* FLOATING SHAPE */}
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            right: "12%",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: darkMode
              ? "rgba(255,255,255,0.03)"
              : "rgba(255,255,255,0.06)",

            animation: "float 5s ease-in-out infinite",
          }}
        />

        {/* LEFT CONTENT */}
        <div
          style={{
            color: darkMode ? "#cbd5f5" : "#f1f5f9", 
            maxWidth: "50%",
          }}
        >
          <h1 style={{ fontSize: "52px", marginBottom: "15px" }}>
            Elevate Your Shopping Experience
          </h1>

          <p style={{ fontSize: "18px", marginBottom: "25px", opacity: 0.9 }}>
            Discover premium products with seamless experience and modern design.
          </p>

          <div style={{ display: "flex", gap: "15px" }}>

            {/* SHOP NOW */}
            <button
              onClick={() => navigate("/products")}
              style={{
                background: "white",
                color: "#20002c",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                border: "none",
              }}
            >
              Shop Now
            </button>

            {/* EXPLORE */}
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo(0, 0);
              }}
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.6)",
                color: "white",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Explore
            </button>

          </div>
        </div>

        {/* IMAGE */}
        <div
          style={{
            width: "420px",
            height: "320px",
            borderRadius: "14px",
            overflow: "hidden",
            animation: "float 5s ease-in-out infinite",
            boxShadow: darkMode
              ? "0 15px 40px rgba(0,0,0,0.6)"
              : "0 15px 40px rgba(124, 70, 126, 0.35)",
          }}
        >
          <img
            src={heroImg}
            alt="hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

      </div>
    </>
  );
}

export default Home;