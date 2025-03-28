"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PaymentMethodSelector } from "@/entities/PaymentSelection/components/PaymentMethodSelector";
import { OrderSummary } from "@/entities/PaymentSelection/components/OrderSummary";
import { GET_TICKET_BY_ID, CREATE_PAYMENT, GET_USER } from "@/graphql/queries";
import { storage } from "@/lib/storage";
import client from "@/lib/client";
import {
  MiniKit,
  VerifyCommandInput,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { log } from "console";
import { PaymentButton } from "@/entities/Event/components/PaymentButton";
import { PaymentSelectionSkeleton } from "@/entities/PaymentSelection/components/skeletons/PaymentSelectionSkeleton";

export default function PaymentSelectionPage({ params }: any) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<
    "pix" | "worldcoin" | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const walletAddress = storage.getWalletAddress();

        if (!walletAddress) {
          console.log(walletAddress);
          console.error("No wallet address found in storage");
          router.push("/login");
          return;
        }

        const { data } = await client.query({
          query: GET_USER,
          variables: {
            whoamiInput: {
              walletAdddress: walletAddress,
            },
          },
        });

        console.log("data", data);

        if (data.whoami) {
          console.log("User found:", data.whoami);
          setUserId(data.whoami._id);
        } else {
          console.error("No user found");
          storage.clearWalletAddress(); // Limpar endereço inválido
          router.push("/login");
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        storage.clearWalletAddress(); // Limpar em caso de erro
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

    console.log("id", params.id);
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
          pix: `/pix-payment/${data.createPayment.id}`,
          worldcoin: `/worldcoin-payment/${data.createPayment.id}`,
        };

        router.push(routeMap[selectedMethod]);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      setLoading(false);
    }
  };

  // Função para verificar se o botão deve estar desabilitado
  const isButtonDisabled = () => {
    // Desabilita se não houver método selecionado, se estiver carregando
    // ou se o método selecionado for PIX
    return !selectedMethod || loading || selectedMethod === "pix";
  };

  // Função para obter o texto do botão
  const getButtonText = () => {
    if (loading) return "Processing...";
    if (selectedMethod === "pix") return "PIX temporarily unavailable";
    return "Continue to payment";
  };

  if (!ticketData) {
    return (
      <main className="flex min-h-screen flex-col p-4">
        <PaymentSelectionSkeleton />

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <div className="w-full max-w-md mx-auto">
            <PaymentButton onClick={() => {}} disabled={true} loading={false} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6 pb-24">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={handleBack}
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>

        <div>
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
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <div className="w-full max-w-md mx-auto">
          <PaymentButton
            onClick={handleContinue}
            disabled={isButtonDisabled()}
            loading={loading}
            text={getButtonText()}
          />
        </div>
      </div>
    </main>
  );
}
