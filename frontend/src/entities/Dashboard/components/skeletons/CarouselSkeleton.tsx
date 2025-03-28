const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media (min-width: 1024px)": {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
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
  dots: {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    marginTop: "8px",
  },
  dot: {
    height: "8px",
    width: "8px",
    borderRadius: "50%",
    backgroundColor: "#e5e7eb",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
} as const;

export function CarouselSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        {[1].map((i) => (
          <div key={i} style={styles.card}>
            <div style={styles.image} />
            <div style={styles.content}>
              <div style={styles.title} />
            </div>
          </div>
        ))}
      </div>
      <div style={styles.dots}>
        {[1].map((i) => (
          <div key={i} style={styles.dot} />
        ))}
      </div>
    </div>
  );
}
