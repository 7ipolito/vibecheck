const styles = {
  container: {
    width: "100%",
    maxWidth: "28rem", // md
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  image: {
    width: "100%",
    height: "256px", // h-64
    backgroundColor: "#e5e7eb",
    borderRadius: "12px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  title: {
    height: "32px",
    width: "75%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  details: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  detailItem: {
    height: "20px",
    width: "60%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  description: {
    height: "80px",
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  select: {
    height: "40px",
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
};

export function EventSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.image} />
      <div style={styles.title} />
      <div style={styles.details}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={styles.detailItem} />
        ))}
      </div>
      <div style={styles.description} />
      <div style={styles.select} />
    </div>
  );
}
