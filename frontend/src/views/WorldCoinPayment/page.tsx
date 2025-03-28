"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GET_PAYMENT, UPDATE_PAYMENT_STATUS } from "@/graphql/queries";
import client from "@/lib/client";
import BackButton from "@/components/BackButton";
import { OrderSummary } from "@/entities/WorldCoinPayment/components/OrderSummary";
import { PaymentSuccess } from "@/entities/WorldCoinPayment/components/PaymentSuccess";
import { PaymentFailed } from "@/entities/WorldCoinPayment/components/PaymentFailed";
import { VerificationForm } from "@/entities/WorldCoinPayment/components/VerificationForm";
import { useContract } from "@/hooks/useContract";
import {
  VerifyCommandInput,
  VerificationLevel,
  MiniKit,
  ISuccessResult,
  PayCommandInput,
  Tokens,
  tokenToDecimals,
} from "@worldcoin/minikit-js";

export function WorldCoinPaymentView({ params }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "completed" | "failed"
  >("pending");
  const contract = useContract();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const { data } = await client.query({
          query: GET_PAYMENT,
          variables: { id: params.id },
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
    if (!MiniKit.isInstalled()) {
      console.error("WorldID is not installed");
      return;
    }

    setVerifying(true);
    try {
      const verifyPayload: VerifyCommandInput = {
        // app_id: process.env.NEXT_PUBLIC_APP_ID as `app_${string}`,
        action: "payment-action",
        verification_level: VerificationLevel.Device,
        signal: params.id,
      };

      const { finalPayload } = await MiniKit.commandsAsync.verify(
        verifyPayload
      );

      if (finalPayload.status === "error") {
        console.error("Verification failed in MiniKit:", finalPayload);
        throw new Error("Verification failed in World App");
      }

      // Verificar a prova no backend
      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: "payment-action",
          signal: params.id,
        }),
      });

      const verificationData = await verifyResponse.json();

      if (!verificationData.verifyRes.success) {
        throw new Error(
          verificationData.verifyRes.detail || "Verification failed"
        );
      }

      setVerified(true);
      console.log("Identity verified successfully!");
    } catch (error: any) {
      console.error("Error during verification:", error);
      setPaymentStatus("failed");
    } finally {
      setVerifying(false);
    }
  };

  const sendPayment = async () => {
    const res = await fetch("/api/initiate-payment", {
      method: "POST",
    });
    const { id } = await res.json();

    const payload: PayCommandInput = {
      reference: id,
      to: "0x323446c4AD69fF1f85bbd9d62B3Fbe522998f438", // Test address
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(
            paymentData.amount,
            Tokens.WLD
          ).toString(),
        },
        {
          symbol: Tokens.USDCE,
          token_amount: tokenToDecimals(
            paymentData.amount,
            Tokens.USDCE
          ).toString(),
        },
      ],
      description: "Test example payment for minikit",
    };

    if (!MiniKit.isInstalled()) {
      return;
    }

    const { finalPayload } = await MiniKit.commandsAsync.pay(payload);

    if (finalPayload.status == "success") {
      const res = await fetch(`/api/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const payment = await res.json();
      console.log("payment", payment);

      if (payment.success) {
        // Congrats your payment was successful!
        await client.mutate({
          mutation: UPDATE_PAYMENT_STATUS,
          variables: {
            id: params.id,
            status: "sold",
          },
        });
        setPaymentStatus("completed");
      }
    }
  };

  const handleMakePayment = async () => {
    if (!verified || !paymentData) return;

    setLoading(true);
    try {
      // Fazer o pagamento usando o contrato
      // const tx = await contract.makePayment(
      //   paymentData.ticket.event._id,
      //   paymentData.amount.toString()
      // );
      // await tx.wait();

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

  if (!paymentData) return null;

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
              onMakePayment={sendPayment}
            />
          )}
        </div>
      </div>
    </main>
  );
}
