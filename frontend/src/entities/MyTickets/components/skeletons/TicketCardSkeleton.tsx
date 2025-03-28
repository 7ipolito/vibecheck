const styles = {
  card: {
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  eventName: {
    height: "24px",
    width: "70%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  text: {
    height: "16px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  badge: {
    height: "24px",
    width: "80px",
    backgroundColor: "#e5e7eb",
    borderRadius: "9999px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

export function TicketCardSkeleton() {
  return (
    <div style={styles.card}>
      <div style={styles.eventName} />
      <div style={styles.details}>
        <div style={styles.info}>
          <div style={{ ...styles.text, width: "120px" }} />
          <div style={{ ...styles.text, width: "100px" }} />
        </div>
        <div style={styles.badge} />
      </div>
    </div>
  );
}
