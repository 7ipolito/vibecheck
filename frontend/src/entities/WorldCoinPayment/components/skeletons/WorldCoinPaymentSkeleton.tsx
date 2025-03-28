const styles = {
  container: {
    width: "100%",
    maxWidth: "28rem",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  backButton: {
    height: "24px",
    width: "80px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  title: {
    height: "32px",
    width: "60%",
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
  verificationForm: {
    marginTop: "24px",
    padding: "24px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  verificationTitle: {
    height: "24px",
    width: "70%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  verificationText: {
    height: "60px",
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  button: {
    height: "48px",
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

export function WorldCoinPaymentSkeleton() {
  return (
    <div style={styles.container}>
      {/* Back button skeleton */}
      <div style={styles.backButton} />

      {/* Title skeleton */}
      <div style={styles.title} />

      {/* Order summary skeleton */}
      <div style={styles.orderSummary}>
        <div style={{ ...styles.summaryItem, width: "70%" }} />
        <div style={{ ...styles.summaryItem, width: "50%" }} />
        <div style={{ ...styles.summaryItem, width: "40%" }} />
      </div>

      {/* Verification form skeleton */}
      <div style={styles.verificationForm}>
        <div style={styles.verificationTitle} />
        <div style={styles.verificationText} />
        <div style={styles.button} />
      </div>
    </div>
  );
}
