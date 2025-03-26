"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import OrderSummary from "@/entities/PixPayment/components/OrderSummary";
import PixPayment from "@/entities/PixPayment/components/PixPayment";
import { createPixPayment } from "@/lib/actions/payment.action";

interface PixPaymentViewProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export function PixPaymentView({ params, searchParams }: PixPaymentViewProps) {
  const router = useRouter();
  const [pixCode, setPixCode] = useState<string>("");
  const [pixQrCode, setPixQrCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "completed" | "failed"
  >("pending");

  const eventId = params.id;
  const { ticketType, price, eventName } = searchParams;

  useEffect(() => {
    const generatePixPayment = async () => {
      setLoading(true);
      try {
        const result = await createPixPayment({
          eventId,
          ticketType,
          price: Number.parseFloat(price),
          description: `Ticket for ${eventName} - ${ticketType}`,
        });

        if (result.success) {
          setPixCode(result.pixCopiaECola);
          setPixQrCode(result.qrCodeImage);
        } else {
          console.error("Failed to generate PIX payment");
        }
      } catch (error) {
        console.error("Error generating PIX payment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId && ticketType && price) {
      generatePixPayment();
    }
  }, [eventId, ticketType, price, eventName]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      console.log("Checking payment status...");
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [eventId]);

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    router.back();
  };

  const checkPaymentStatus = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaymentStatus(paymentStatus === "pending" ? "completed" : "pending");
    }, 1500);
  };

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <BackButton onClick={handleBack} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Payment</h1>

          <OrderSummary
            eventName={searchParams.eventName}
            ticketType={searchParams.ticketType}
            price={searchParams.price}
          />

          <PixPayment
            loading={loading}
            paymentStatus={paymentStatus}
            pixCode={pixCode}
            pixQrCode={pixQrCode}
            onCheckPayment={checkPaymentStatus}
            onNavigateToTickets={() => router.push("/dashboard")}
          />
        </div>
      </div>
    </main>
  );
}
