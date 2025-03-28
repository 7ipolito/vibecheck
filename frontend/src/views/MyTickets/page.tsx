"use client";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { TicketCard } from "@/entities/MyTickets/components/TicketCard";
import { GET_USER_PAYMENTS } from "@/graphql/queries";
import client from "@/lib/client";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";

export function MyTicketsView() {
  const router = useRouter();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const walletAddress = storage.getWalletAddress();

        if (!walletAddress) {
          router.push("/login");
          return;
        }
        console.log(walletAddress);
        const { data } = await client.query({
          query: GET_USER_PAYMENTS,
          variables: {
            walletAddress: walletAddress, // Usando a nova query que espera walletAddress
          },
        });

        console.log("Payments received:", data);
        setPayments(data.userPayments);
      } catch (error) {
        console.error("Error fetching payments:", error);
        // Se houver erro na autenticação, redirecionar para login
        // if (
        //   error.message.includes("User not found") ||
        //   error.message.includes("unauthorized")
        // ) {
        //   storage.clearWalletAddress();
        //   router.push("/login");
        // }
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto">
        <BackButton onClick={() => router.push("/dashboard  ")} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">My Tickets</h1>

          {payments.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No tickets found
            </p>
          ) : (
            <div className="grid gap-4">
              {payments.map((payment: any, index: number) => (
                <TicketCard
                  key={payment._id || `payment-${index}`}
                  eventName={payment.ticket?.event?.name || "Unknown Event"}
                  ticketType={payment.ticket?.type || "Unknown Type"}
                  date={new Date(payment.createdAt).toLocaleDateString()}
                  status={"completed"}
                  method={payment.method || "pending"}
                  onClick={() => {
                    if (payment.ticket?.bucketUrl) {
                      window.open(payment.ticket.bucketUrl, "_blank");
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
