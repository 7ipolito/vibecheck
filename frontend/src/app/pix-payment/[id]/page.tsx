"use client";
import { PixPaymentView } from "@/views/PixPayment/page";

interface PaymentPageProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export default function PixPaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  return <PixPaymentView params={params} searchParams={searchParams} />;
}
