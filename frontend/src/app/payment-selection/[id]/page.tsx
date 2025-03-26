"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, Globe } from "lucide-react";

import PaymentSelectionPage from "@/views/PaymentSelection/page";

interface PaymentSelectionProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export default function PaymentSelection({
  params,
  searchParams,
}: PaymentSelectionProps) {
  return <PaymentSelectionPage params={params} searchParams={searchParams} />;
}
