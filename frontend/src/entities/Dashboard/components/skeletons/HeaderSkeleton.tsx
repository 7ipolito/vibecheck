const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationSkeleton: {
    height: "32px",
    width: "128px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  avatarSkeleton: {
    height: "32px",
    width: "32px",
    backgroundColor: "#e5e7eb",
    borderRadius: "50%",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
} as const;

export function HeaderSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.locationSkeleton} />
      <div style={styles.avatarSkeleton} />
    </div>
  );
}
