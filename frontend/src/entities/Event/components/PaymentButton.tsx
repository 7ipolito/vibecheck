"use client";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface PaymentButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function PaymentButton({ disabled, onClick }: PaymentButtonProps) {
  return (
    <div className="pt-6">
      <Button
        onClick={onClick}
        className="w-full py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        disabled={disabled}
      >
        <CreditCard className="mr-2 h-5 w-5" />
        Go to payment selection
      </Button>
    </div>
  );
}
