import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PaymentSuccessProps {
  onNavigateToTickets: () => void;
}

export function PaymentSuccess({ onNavigateToTickets }: PaymentSuccessProps) {
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
