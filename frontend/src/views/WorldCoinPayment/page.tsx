"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GET_PAYMENT } from "@/graphql/queries";
import client from "@/lib/client";
import BackButton from "@/components/BackButton";
import { OrderSummary } from "@/entities/WorldCoinPayment/components/OrderSummary";
import { PaymentSuccess } from "@/entities/WorldCoinPayment/components/PaymentSuccess";
import { PaymentFailed } from "@/entities/WorldCoinPayment/components/PaymentFailed";
import { VerificationForm } from "@/entities/WorldCoinPayment/components/VerificationForm";

interface WorldCoinPaymentViewProps {
  params: {
    id: string;
  };
}

export function WorldCoinPaymentView({ params }: WorldCoinPaymentViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "completed" | "failed"
  >("pending");

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const { data } = await client.query({
          query: GET_PAYMENT,
          variables: {
            id: params.id,
          },
        });

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

  const handleVerifyIdentity = async () => {
    setVerifying(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setVerified(true);
    } catch (error) {
      console.error("Error verifying identity:", error);
    } finally {
      setVerifying(false);
    }
  };

  const handleMakePayment = async () => {
    if (!verified) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setPaymentStatus("completed");
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentStatus("failed");
    } finally {
      setLoading(false);
    }
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
      <div className="w-full max-w-md mx-auto space-y-6">
        <BackButton onClick={() => router.back()} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">WorldCoin Payment</h1>

          <OrderSummary
            eventName={paymentData.ticket.event.name}
            ticketType={paymentData.ticket.type}
            price={paymentData.amount}
          />

          {paymentStatus === "completed" ? (
            <PaymentSuccess
              onNavigateToTickets={() => router.push("/my-tickets")}
            />
          ) : paymentStatus === "failed" ? (
            <PaymentFailed onRetry={() => setPaymentStatus("pending")} />
          ) : (
            <VerificationForm
              verified={verified}
              verifying={verifying}
              loading={loading}
              onVerify={handleVerifyIdentity}
              onMakePayment={handleMakePayment}
            />
          )}
        </div>
      </div>
    </main>
  );
}
