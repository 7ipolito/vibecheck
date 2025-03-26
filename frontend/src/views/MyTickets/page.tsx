"use client";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { TicketCard } from "@/entities/MyTickets/components/TicketCard";
import { GET_USER_PAYMENTS } from "@/graphql/queries";
import client from "@/lib/client";
import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export function MyTicketsView() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const { data } = await client.query({
          query: GET_USER_PAYMENTS,
          variables: {
            userId: MiniKit.user?.walletAddress, // Você precisa passar o ID do usuário logado
          },
        });

        setPayments(data.userPayments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

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
