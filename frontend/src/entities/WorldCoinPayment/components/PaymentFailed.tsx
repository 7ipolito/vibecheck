import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface PaymentFailedProps {
  onRetry: () => void;
}

export function PaymentFailed({ onRetry }: PaymentFailedProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Payment Failed</AlertTitle>
      <AlertDescription>
        There was an error processing your payment. Please try again or choose a
        different payment method.
      </AlertDescription>
      <Button variant="outline" className="mt-4 w-full" onClick={onRetry}>
        Try Again
      </Button>
    </Alert>
  );
}
