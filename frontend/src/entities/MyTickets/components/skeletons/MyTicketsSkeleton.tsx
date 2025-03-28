import { TicketCardSkeleton } from "./TicketCardSkeleton";

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
    width: "150px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  ticketsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
};

export function MyTicketsSkeleton() {
  return (
    <div style={styles.container}>
      <div style={styles.backButton} />
      <div style={styles.title} />
      <div style={styles.ticketsList}>
        {/* Renderiza 3 skeletons de tickets */}
        {[1, 2, 3].map((i) => (
          <TicketCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
