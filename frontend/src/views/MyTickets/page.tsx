"use client";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { TicketCard } from "@/entities/MyTickets/components/TicketCard";

export function MyTicketsView() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <BackButton onClick={() => router.back()} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My Tickets</h1>

          <div className="grid gap-4">
            {/* Aqui você pode mapear seus tickets */}
            <TicketCard
              eventName="Example Event"
              ticketType="VIP"
              date="2024-03-26"
              onClick={() => console.log("clicked")}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
