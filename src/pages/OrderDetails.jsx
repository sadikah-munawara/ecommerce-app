import { useParams } from "react-router-dom";

function OrderDetails() {

  const { id } = useParams();

  const orders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return <h2 style={{ padding: "40px" }}>Order not found</h2>;
  }

  return (

    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h1>Order Details</h1>

      <h3>Order ID: {order.id}</h3>
      <p>Date: {order.date}</p>
      <p>Status: {order.status}</p>

      <h2 style={{ marginTop: "30px" }}>Items</h2>

      {order.items.map((item) => (

        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            padding: "10px 0"
          }}
        >

          <span>
            {item.title} × {item.quantity}
          </span>

          <span>
            ₹ {item.price * item.quantity}
          </span>

        </div>

      ))}

      <h3 style={{ marginTop: "20px" }}>
        Total: ₹ {order.total}
      </h3>

    </div>

  );
}

export default OrderDetails;