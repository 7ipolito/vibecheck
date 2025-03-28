"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GET_PAYMENT } from "@/graphql/queries";
import BackButton from "@/components/BackButton";
import OrderSummary from "@/entities/PixPayment/components/OrderSummary";
import PixPayment from "@/entities/PixPayment/components/PixPayment";
import { createPixPayment } from "@/lib/actions/payment.action";
import client from "@/lib/client";

export function PixPaymentView({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "completed" | "failed"
  >("pending");
  const [pixCode, setPixCode] = useState("");
  const [pixQrCode, setPixQrCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        console.log("Fetching payment with ID:", params.id); // Debug log

        const { data } = await client.query({
          query: GET_PAYMENT,
          variables: {
            id: params.id,
          },
        });

        console.log("Payment data received:", data); // Debug log

        if (data?.payment) {
          setPaymentData(data.payment);
        } else {
          console.error("No payment data received");
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching payment:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchPayment();
    }
  }, [params.id, router]);

  useEffect(() => {
    const generatePixPayment = async () => {
      if (!paymentData) return;

      setLoading(true);
      try {
        const result = await createPixPayment({
          eventId: paymentData.ticket.event.id,
          ticketType: paymentData.ticket.type,
          price: paymentData.amount,
          description: `Ticket for ${paymentData.ticket.event.name} - ${paymentData.ticket.type}`,
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

    if (paymentData) {
      generatePixPayment();
    }
  }, [paymentData]);

  useEffect(() => {
    const checkInterval = setInterval(() => {
      console.log("Checking payment status...");
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto">
        <BackButton onClick={handleBack} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Payment</h1>

          <OrderSummary
            eventName={paymentData.ticket.event.name}
            ticketType={paymentData.ticket.type}
            price={paymentData.amount}
          />

          <PixPayment
            loading={loading}
            paymentStatus={paymentStatus}
            pixCode={pixCode}
            pixQrCode={pixQrCode}
            onCheckPayment={checkPaymentStatus}
            onNavigateToTickets={() => router.push("/my-tickets")}
          />
        </div>
      </div>
    </main>
  );
}
