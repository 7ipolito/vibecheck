"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetTicketParams } from "@/lib/actions/shared.types";

export interface Ticket {
  _id: string;
  type: string;
  price: number;
  event: {
    _id: string;
    name: string;
  };
}
interface TicketSelectorProps {
  ticketData: any[];
  selectedTicket: Ticket;
  onTicketSelect: (value: string) => void;
}

export function TicketSelector({
  ticketData,
  selectedTicket,
  onTicketSelect,
}: TicketSelectorProps) {
  return (
    <div className="pt-4 border-t">
      <div className="flex justify-between items-center">
        <div className="space-y-2 w-full">
          <p className="text-sm text-muted-foreground">
            {ticketData.length > 0
              ? "Select Ticket Type"
              : "No tickets available"}
          </p>
          <Select
            onValueChange={onTicketSelect}
            value={selectedTicket}
            disabled={ticketData.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={"Select a ticket type"} />
            </SelectTrigger>
            <SelectContent>
              {ticketData?.map((ticket: any) => (
                <SelectItem key={ticket.type} value={ticket}>
                  {ticket.type} - R${" "}
                  {ticket.price.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTicket && (
            <p className="text-sm font-medium mt-2">
              Selected Type: {selectedTicket.type}
              <br />
              Price: R${" "}
              {ticketData
                .find((t: any) => t.type === selectedTicket.type)
                ?.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
