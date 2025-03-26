import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface PixCodeCopyProps {
  pixCode: string;
  copied: boolean;
  onCopy: () => void;
}

export function PixCodeCopy({ pixCode, copied, onCopy }: PixCodeCopyProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-center text-muted-foreground">
        Scan the QR code with your bank app or copy the PIX code below
      </p>

      <div className="relative">
        <div className="bg-muted p-3 rounded-md text-xs break-all">
          {pixCode || "PIX code will appear here"}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={onCopy}
          disabled={!pixCode}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
