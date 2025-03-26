import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, RefreshCw } from "lucide-react";
import Image from "next/image";
import { CheckPaymentButton } from "./CheckPaymentButton";
import { PixCodeCopy } from "./PixCodeCopy";
import { QrCodeDisplay } from "./QrCodeDisplay";

interface PixPaymentProps {
  loading: boolean;
  paymentStatus: "pending" | "completed" | "failed";
  pixCode: string;
  pixQrCode: string;
  onCheckPayment: () => void;
  onNavigateToTickets: () => void;
}

export default function PixPayment({
  loading,
  paymentStatus,
  pixCode,
  pixQrCode,
  onCheckPayment,
  onNavigateToTickets,
}: PixPaymentProps) {
  const [copied, setCopied] = useState(false);

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tabs defaultValue="pix" className="w-full">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="pix">PIX</TabsTrigger>
      </TabsList>
      <TabsContent value="pix" className="space-y-4 mt-4">
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {paymentStatus === "completed" ? (
              <SuccessState onNavigateToTickets={onNavigateToTickets} />
            ) : (
              <PendingState
                pixQrCode={pixQrCode}
                pixCode={pixCode}
                copied={copied}
                onCopyCode={copyPixCode}
                onCheckPayment={onCheckPayment}
                loading={loading}
              />
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}

// Subcomponentes para os diferentes estados
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-2 text-sm text-muted-foreground">
        Generating PIX payment...
      </p>
    </div>
  );
}

function SuccessState({
  onNavigateToTickets,
}: {
  onNavigateToTickets: () => void;
}) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <Check className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-green-800">
        Payment Successful!
      </h3>
      <p className="mt-2 text-sm text-green-600">
        Your ticket has been confirmed. You'll receive an email with the
        details.
      </p>
      <Button className="mt-4 w-full" onClick={onNavigateToTickets}>
        Go to My Tickets
      </Button>
    </div>
  );
}

function PendingState({
  pixQrCode,
  pixCode,
  copied,
  onCopyCode,
  onCheckPayment,
  loading,
}: {
  pixQrCode: string;
  pixCode: string;
  copied: boolean;
  onCopyCode: () => void;
  onCheckPayment: () => void;
  loading: boolean;
}) {
  return (
    <>
      <QrCodeDisplay pixQrCode={pixQrCode} />
      <PixCodeCopy pixCode={pixCode} copied={copied} onCopy={onCopyCode} />
      <CheckPaymentButton onCheck={onCheckPayment} loading={loading} />
    </>
  );
}
