"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import client from "@/lib/client";
import { GET_TICKET } from "@/graphql/queries";
import type { GetTicketParams } from "@/lib/actions/shared.types";
import { EventDescription } from "@/entities/Event/components/EventDescription";
import { EventDetails } from "@/entities/Event/components/EventDetails";
import { EventHeader } from "@/entities/Event/components/EventHeader";
import { PaymentButton } from "@/entities/Event/components/PaymentButton";
import { TicketSelector } from "@/entities/Event/components/TicketSelection";
import EventImage from "@/entities/Rating/components/EventImage";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventView({ params }: EventPageProps) {
  const router = useRouter();
  const [eventData, setEventData] = useState<GetTicketParams | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<string>("");
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({
          query: GET_TICKET,
          variables: {
            findTicketInput: {
              eventId: params.id,
            },
          },
        });

        if (!data.tickets || data.tickets.length === 0) {
          router.push("/dashboard");
          return;
        }

        setTicketData(data.tickets || []);
        setEventData(data.tickets[0] || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        router.push("/");
      }
    };

    fetchPosts();
  }, [router, params.id]);

  const handleTicketSelect = (value: string) => {
    setSelectedTicket(value);
  };

  const handleBack = () => {
    router.back();
  };

  const handlePayment = () => {
    console.log("Navigating to payment screen");
    router.push(`/payment-selection/1`);
  };

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <EventHeader onBack={handleBack} />

        {eventData?.event && (
          <>
            <EventImage
              src={eventData.event.image}
              alt={eventData.event.name || "Event image"}
            />

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{eventData.event.name}</h1>

              <EventDetails />

              <EventDescription />

              <TicketSelector
                ticketData={ticketData}
                selectedTicket={selectedTicket}
                onTicketSelect={handleTicketSelect}
              />

              <PaymentButton
                disabled={!selectedTicket}
                onClick={handlePayment}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
