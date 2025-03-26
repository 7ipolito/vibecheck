import { Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TicketCardProps {
  eventName: string;
  ticketType: string;
  date: string;
  onClick: () => void;
}

export function TicketCard({
  eventName,
  ticketType,
  date,
  onClick,
}: TicketCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-lg border bg-card text-card-foreground hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{eventName}</h3>
            <Badge variant="secondary" className="text-xs">
              {ticketType}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <Ticket className="h-6 w-6 text-muted-foreground" />
      </div>
    </button>
  );
}
