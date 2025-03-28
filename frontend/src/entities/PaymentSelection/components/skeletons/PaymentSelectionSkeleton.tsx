const styles = {
  container: {
    width: "100%",
    maxWidth: "28rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  header: {
    height: "32px",
    width: "75%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  orderSummary: {
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },
  summaryItem: {
    height: "20px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  paymentMethods: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "24px",
  },
  methodCard: {
    height: "120px",
    backgroundColor: "#e5e7eb",
    borderRadius: "8px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

export function PaymentSelectionSkeleton() {
  return (
    <div style={styles.container}>
      {/* Back button skeleton */}
      <div style={{ ...styles.summaryItem, width: "80px" }} />

      {/* Title skeleton */}
      <div style={styles.header} />

      {/* Order summary skeleton */}
      <div style={styles.orderSummary}>
        <div style={{ ...styles.summaryItem, width: "60%" }} />
        <div style={{ ...styles.summaryItem, width: "40%" }} />
        <div style={{ ...styles.summaryItem, width: "30%" }} />
      </div>

      {/* Payment methods skeleton */}
      <div style={styles.paymentMethods}>
        <div style={styles.methodCard} />
        <div style={styles.methodCard} />
      </div>
    </div>
  );
}
