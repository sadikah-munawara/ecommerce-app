function Wishlist({ wishlist }) {

  const safeWishlist = wishlist.filter((product) => product && product.id);

  return (
    <div style={{ padding: "40px" }}>

      <h2>My Wishlist</h2>

      {safeWishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        safeWishlist.map((product) => (

          <div
            key={product.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "10px"
            }}
          >

            <img
              src={product.image}
              alt={product.title}
              width="100"
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "8px"
              }}
            />

            <div>
              <h4>{product.title}</h4>
              <p>₹ {product.price}</p>
            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default Wishlist;