import { Button } from "@/components/ui/button";
import { RefreshCw, Globe, Check } from "lucide-react";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";

function VerificationStep({
  verifying,
  onVerify,
}: {
  verifying: boolean;
  onVerify: () => void;
}) {
  return (
    <>
      <h3 className="text-lg font-medium mb-2">Verify Your Identity</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        To pay with WorldCoin, you need to verify your identity first.
      </p>
      <Button onClick={onVerify} className="w-full" disabled={verifying}>
        {verifying ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            <Globe className="mr-2 h-4 w-4" />
            Verify with WorldCoin
          </>
        )}
      </Button>
    </>
  );
}

function PaymentStep({
  loading,
  onMakePayment,
}: {
  loading: boolean;
  onMakePayment: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-center mb-4 text-green-600">
        <Check className="h-6 w-6 mr-2" />
        <span className="font-medium">Identity Verified</span>
      </div>
      <h3 className="text-lg font-medium mb-2">Complete Payment</h3>
      <p className="text-sm text-muted-foreground text-center mb-4">
        Your identity has been verified. You can now complete your payment.
      </p>
      <Button
        onClick={onMakePayment}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay with WorldCoin"
        )}
      </Button>
    </>
  );
}

interface VerificationFormProps {
  verified: boolean;
  verifying: boolean;
  loading: boolean;
  onVerify: () => void;
  onMakePayment: () => void;
}

export function VerificationForm({
  verified,
  verifying,
  loading,
  onVerify,
  onMakePayment,
}: VerificationFormProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
      <div className="mb-4">
        <Image
          src={MiniKit.user?.profilePictureUrl!}
          alt="WorldCoin Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>

      {!verified ? (
        <VerificationStep verifying={verifying} onVerify={onVerify} />
      ) : (
        <PaymentStep loading={loading} onMakePayment={onMakePayment} />
      )}
    </div>
  );
}
