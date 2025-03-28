"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, CreditCard, Tag, Ticket } from "lucide-react";

interface TicketCardProps {
  eventName: string;
  ticketType: string;
  date: string;
  status: string;
  method: string;
  onClick: () => void;
  onClickCard: () => void;
}

export function TicketCard({
  eventName,
  ticketType,
  date,
  status,
  method,
  onClick,
  onClickCard,
}: TicketCardProps) {
  // Function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sold":
        return {
          backgroundColor: "#22c55e", // green-500
          color: "white",
        };
      case "pending":
        return {
          backgroundColor: "#eab308", // yellow-500
          color: "white",
        };
      case "failed":
        return {
          backgroundColor: "#ef4444", // red-500
          color: "white",
        };
      default:
        return {
          backgroundColor: "#6b7280", // gray-500
          color: "white",
        };
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-primary/5 pb-2">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-1">{eventName}</h3>
          <Badge style={getStatusColor(status)}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent onClick={onClickCard}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{ticketType}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{date}</span>
          </div>

          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm capitalize">{method}</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-4 pb-4">
        <Button
          onClick={onClick}
          className="w-full gap-2"
          variant="default"
          disabled={status.toLowerCase() !== "sold"}
        >
          <Ticket className="h-4 w-4" />
          {status.toLowerCase() === "sold" ? "See ticket" : "Payment pending"}
        </Button>
      </CardFooter>
    </Card>
  );
}
