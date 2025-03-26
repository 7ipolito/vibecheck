"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentButtonProps {
  disabled: boolean;
  loading?: boolean;
  onClick: () => void;
}

export function PaymentButton({
  disabled,
  loading,
  onClick,
}: PaymentButtonProps) {
  return (
    <Button className="w-full mb-10" disabled={disabled} onClick={onClick}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Continue to payment"
      )}
    </Button>
  );
}
