"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PaymentMethodSelector } from "@/entities/PaymentSelection/components/PaymentMethodSelector";
import { OrderSummary } from "@/entities/PaymentSelection/components/OrderSummary";

interface PaymentSelectionProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export default function PaymentSelectionPage({
  params,
  searchParams,
}: PaymentSelectionProps) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<
    "pix" | "worldcoin" | null
  >(null);
  const [loading, setLoading] = useState(false);

  const eventId = params.id;
  const { ticketType, price, eventName } = searchParams;

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (!selectedMethod) return;

    setLoading(true);

    const routeMap = {
      pix: `/pix-payment/${eventId}?ticketType=${ticketType}&price=${price}&eventName=${eventName}`,
      worldcoin: `/worldcoin-payment/${eventId}?ticketType=${ticketType}&price=${price}&eventName=${eventName}`,
    };

    router.push(routeMap[selectedMethod]);
  };

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

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Choose Payment Method</h1>

          <OrderSummary
            eventName={eventName}
            ticketType={ticketType}
            price={price}
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
      </div>
    </main>
  );
}
