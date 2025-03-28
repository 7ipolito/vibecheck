const styles = {
  card: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "134px",
    backgroundColor: "#e5e7eb",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  content: {
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  title: {
    height: "16px",
    width: "75%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
} as const;

export function EventCardSkeleton() {
  return (
    <div style={styles.card}>
      <div style={styles.image} />
      <div style={styles.content}>
        <div style={styles.title} />
      </div>
    </div>
  );
}
