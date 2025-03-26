import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CheckPaymentButtonProps {
  onCheck: () => void;
  loading: boolean;
}

export function CheckPaymentButton({
  onCheck,
  loading,
}: CheckPaymentButtonProps) {
  return (
    <div className="pt-4 space-y-2">
      <p className="text-sm text-center text-muted-foreground">
        After making the payment, click the button below to check the status
      </p>
      <Button className="w-full" onClick={onCheck} disabled={loading}>
        {loading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          "I've made the payment"
        )}
      </Button>
    </div>
  );
}
