import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart, setCart }) {

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1
                ? item.quantity - 1
                : 1
            }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => {

          const itemTotal = item.price * item.quantity;

          return (
            <div
              key={item.id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "20px 0"
              }}
            >

              <h3>{item.title}</h3>

              <p>Price: ₹ {item.price}</p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "10px"
                }}
              >

                {/* Quantity Controls */}
                <div>

                  <button
                    onClick={() => decreaseQty(item.id)}
                    style={{
                      padding: "5px 12px",
                      fontSize: "16px",
                      cursor: "pointer"
                    }}
                  >
                    −
                  </button>

                  <span style={{ margin: "0 15px", fontSize: "18px" }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    style={{
                      padding: "5px 12px",
                      fontSize: "16px",
                      cursor: "pointer"
                    }}
                  >
                    +
                  </button>

                </div>

                {/* Item Total */}
                <div style={{ fontWeight: "bold" }}>
                  Total: ₹ {itemTotal}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#97288e",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>

              </div>

            </div>
          );

        })
      )}

      <h3 style={{ marginTop: "30px" }}>
        Cart Total: ₹ {total}
      </h3>

      {cart.length > 0 && (
        <Link to="/checkout">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Proceed to Checkout
          </button>
        </Link>
      )}

    </div>
  );
}
export default Cart;