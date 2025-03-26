"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PaymentMethodSelector } from "@/entities/PaymentSelection/components/PaymentMethodSelector";
import { OrderSummary } from "@/entities/PaymentSelection/components/OrderSummary";
import { GET_TICKET_BY_ID, CREATE_PAYMENT } from "@/graphql/queries";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import client from "@/lib/client";

interface PaymentSelectionProps {
  params: {
    id: string;
  };
}

export default function PaymentSelectionPage({
  params,
}: PaymentSelectionProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<
    "pix" | "worldcoin" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      const walletAddress = await useWalletAddress();
      if (!walletAddress) {
        router.push("/login");
        return;
      }

      try {
        const { data } = await client.query({
          query: GET_USER,
          variables: {
            whoamiInput: {
              walletAdddress: walletAddress,
            },
          },
        });

        if (data.whoami) {
          setUserId(data.whoami._id);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
      }
    };

    initializeUser();
  }, [router]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await client.query({
          query: GET_TICKET_BY_ID,
          variables: {
            id: params.id,
          },
        });

        console.log(data);

        setTicketData(data.ticket);
      } catch (error) {
        console.error("Error fetching ticket:", error);
        router.push("/");
      }
    };

    fetchTicket();
  }, [router, params.id]);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = async () => {
    if (!selectedMethod || !ticketData || !userId) return;

    setLoading(true);
    try {
      const { data } = await client.mutate({
        mutation: CREATE_PAYMENT,
        variables: {
          input: {
            userId: userId,
            ticketId: params.id,
            method: selectedMethod.toUpperCase(),
            amount: ticketData.price,
          },
        },
      });
      console.log("payment created");

      console.log(data);

      if (data.createPayment) {
        const routeMap = {
          pix: `/pix-payment/${data.createPayment._id}`,
          worldcoin: `/worldcoin-payment/${data.createPayment._id}`,
        };

        router.push(routeMap[selectedMethod]);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setLoading(false);
    }
  };

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Button
          variant="ghost"
          className="mb-4 p-0 hover:bg-transparent"
          onClick={handleBack}
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>

        {ticketData && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Choose Payment Method</h1>

            <OrderSummary
              eventName={ticketData.event.name}
              ticketType={ticketData.type}
              price={ticketData.price}
            />

            <PaymentMethodSelector
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />

            <Button
              onClick={handleContinue}
              className="w-full py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={!selectedMethod || loading}
            >
              {loading ? "Processing..." : "Continue to payment"}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
