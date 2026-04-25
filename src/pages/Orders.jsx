import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);

  }, []);

  return (

    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

      <h1>My Orders</h1>
      <p>View your recent purchase history</p>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (

          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div>
              <h4>Order ID: {order.id}</h4>
              <p>Ordered on: {order.date}</p>

              <span
                style={{
                  padding: "5px 10px",
                  background:
                    order.status === "Delivered"
                      ? "green"
                      : "orange",
                  color: "white",
                  borderRadius: "5px"
                }}
              >
                {order.status}
              </span>
            </div>

            <div>
              <h3>₹ {order.total}</h3>

              <Link to={`/orders/${order.id}`}>
                <button>
                  View Details
                </button>
              </Link>
            </div>

          </div>

        ))
      )}

    </div>

  );
}

export default Orders;