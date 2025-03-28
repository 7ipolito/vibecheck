const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  label: {
    height: "16px",
    width: "192px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  buttonGroup: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  button: {
    height: "40px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
} as const;

export function DatePickerSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.label} />
      <div style={styles.buttonGroup}>
        <div style={styles.button} />
        <div style={styles.button} />
      </div>
    </div>
  );
}
