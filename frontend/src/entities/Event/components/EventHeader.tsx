"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface EventHeaderProps {
  onBack: () => void;
}

export function EventHeader({ onBack }: EventHeaderProps) {
  return (
    <Button
      variant="ghost"
      className="mb-4 p-0 hover:bg-transparent"
      onClick={onBack}
    >
      <ArrowLeft className="h-6 w-6 mr-2" />
      Back
    </Button>
  );
}
