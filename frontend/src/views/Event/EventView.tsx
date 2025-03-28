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
import {
  Ticket,
  TicketSelector,
} from "@/entities/Event/components/TicketSelection";
import EventImage from "@/entities/Rating/components/EventImage";
import { EventSkeleton } from "@/entities/Event/components/skeletons/EventSkeleton";

interface EventViewProps {
  params: {
    id: string;
  };
}

export function EventView({ params }: EventViewProps) {
  const router = useRouter();
  const [eventData, setEventData] = useState<GetTicketParams | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>("");
  const [ticketData, setTicketData] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router, params.id]);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const handleBack = () => {
    router.back();
  };

  const handlePayment = () => {
    if (!selectedTicket) return;
    router.push(`/payment-selection/${selectedTicket.id}`);
  };

  if (loading) {
    return <EventSkeleton />;
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 pb-20">
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
          </div>
        </>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="w-full max-w-md mx-auto">
          <PaymentButton disabled={!selectedTicket} onClick={handlePayment} />
        </div>
      </div>
    </div>
  );
}
