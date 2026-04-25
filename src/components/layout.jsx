import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children, cartCount }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;