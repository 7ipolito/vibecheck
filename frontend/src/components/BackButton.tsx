import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
}

export default function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      className="mb-4 p-0 hover:bg-transparent"
      onClick={onClick}
    >
      <ArrowLeft className="h-6 w-6 mr-2" />
      Back
    </Button>
  );
}
