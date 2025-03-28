"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, QrCode, Globe } from "lucide-react";

import PaymentSelectionPage from "@/views/PaymentSelection/page";

export default function PaymentSelection({ params, searchParams }: any) {
  return <PaymentSelectionPage params={params} searchParams={searchParams} />;
}
