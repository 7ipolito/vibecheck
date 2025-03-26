"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import { OrderSummary } from "@/entities/WorldCoinPayment/components/OrderSummary";
import { PaymentSuccess } from "@/entities/WorldCoinPayment/components/PaymentSuccess";
import { PaymentFailed } from "@/entities/WorldCoinPayment/components/PaymentFailed";
import { VerificationForm } from "@/entities/WorldCoinPayment/components/VerificationForm";

interface WorldCoinPaymentViewProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export function WorldCoinPaymentView({
  params,
  searchParams,
}: WorldCoinPaymentViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "completed" | "failed"
  >("pending");

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

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <BackButton onClick={() => router.back()} />

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">WorldCoin Payment</h1>

          <OrderSummary {...searchParams} />

          {paymentStatus === "completed" ? (
            <PaymentSuccess
              onNavigateToTickets={() => router.push("/dashboard")}
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
