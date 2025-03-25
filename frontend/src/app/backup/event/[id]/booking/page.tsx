"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Minus, Plus } from "lucide-react";

interface BookingPageProps {
  params: {
    id: string;
  };
}

export default function BookingPage({ params }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [ticketCount, setTicketCount] = useState(1);

  // In a real app, you would fetch event data based on the ID
  const eventData = {
    id: params.id,
    title: params.id === "1" ? "Music Festival" : "Food & Wine Festival",
    price: 85,
  };

  const increaseTickets = () => {
    if (ticketCount < 10) {
      setTicketCount(ticketCount + 1);
    }
  };

  const decreaseTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const totalPrice = eventData.price * ticketCount;

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">{eventData.title}</h1>

        <div className="space-y-4">
          <h2 className="font-medium">Select Date</h2>
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Number of Tickets</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span>Regular Ticket</span>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decreaseTickets}
                    disabled={ticketCount <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{ticketCount}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={increaseTickets}
                    disabled={ticketCount >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-medium">R$ {totalPrice.toFixed(2)}</p>
            </div>
            <Link href={`/payment`}>
              <Button>Continue to Payment</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
