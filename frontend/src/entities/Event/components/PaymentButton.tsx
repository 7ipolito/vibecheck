"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PaymentButtonProps {
  disabled: boolean;
  loading?: boolean;
  onClick: () => void;
  text?: string;
}

export function PaymentButton({
  disabled,
  loading,
  onClick,
  text = "Continue to payment",
}: PaymentButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
