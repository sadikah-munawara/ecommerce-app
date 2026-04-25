function Notifications({ notifications }) {

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 999
      }}
    >

      {notifications.map((note) => (

        <div
          key={note.id}
          style={{
            background: "#333",
            color: "white",
            padding: "12px 18px",
            borderRadius: "6px",
            minWidth: "200px"
          }}
        >
          {note.message}
        </div>

      ))}

    </div>
  );
}

export default Notifications;