import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [finalAmount, setFinalAmount] = useState(0);

  const [billingData, setBillingData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (
      billingData.name === "" ||
      billingData.email === "" ||
      billingData.address === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    setStep(2);
  };

  const generateOrderId = () => {
    return "ORD" + Math.floor(Math.random() * 1000000);
  };

  const handlePlaceOrder = () => {

    setLoading(true);

    setTimeout(() => {

      const newOrderId = generateOrderId();

      setFinalAmount(totalPrice);
      setOrderId(newOrderId);

      const newOrder = {
  id: generateOrderId(),
  date: new Date().toLocaleDateString(),
  items: cart,
  total: totalPrice,
  status: "Delivered"
};

const existingOrders =
  JSON.parse(localStorage.getItem("orders")) || [];

localStorage.setItem(
  "orders",
  JSON.stringify([newOrder, ...existingOrders])
);

setOrderId(newOrder.id);
setFinalAmount(totalPrice);

setCart([]);

      setLoading(false);
      setStep(3);

    }, 2000);

  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your cart is empty.</h2>

        <button
          style={buttonStyle}
          onClick={() => navigate("/products")}
        >
          Go to Products
        </button>

      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >

      <h1 style={{ textAlign: "center" }}>Checkout</h1>
      <p style={{ textAlign: "center" }}>Step {step} of 3</p>

      {step === 1 && (
        <>
          <h2>Billing Information</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={billingData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={billingData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={billingData.address}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={billingData.city}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={billingData.zip}
            onChange={handleChange}
            style={inputStyle}
          />

          <button style={buttonStyle} onClick={handleNext}>
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {item.title} × {item.quantity}
              </span>

              <span>₹ {item.price * item.quantity}</span>
            </div>
          ))}

          <hr />

          <h3 style={{ textAlign: "right" }}>
            Total: ₹ {totalPrice}
          </h3>

          <div style={{ marginTop: "20px" }}>

            <button
              style={{
                ...buttonStyle,
                backgroundColor: "gray",
                marginRight: "10px",
              }}
              onClick={() => setStep(1)}
            >
              Back
            </button>

            <button
              style={buttonStyle}
              onClick={handlePlaceOrder}
            >
              {loading ? "Processing Payment..." : "Pay Now"}
            </button>

          </div>
        </>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center" }}>

          <h2>🎉 Order Placed Successfully!</h2>

          <p>Thank you, {billingData.name}.</p>

          <p>Your Order ID:</p>

          <h3>{orderId}</h3>

          <p>Total Paid: ₹ {finalAmount}</p>

          <button
            style={{ ...buttonStyle, marginTop: "20px" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>

        </div>
      )}

    </div>
  );
}

export default Checkout;