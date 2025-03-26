"use client";
import { WorldCoinPaymentView } from "@/views/WorldCoinPayment/page";

interface WorldcoinPaymentProps {
  params: {
    id: string;
  };
  searchParams: {
    ticketType: string;
    price: string;
    eventName: string;
  };
}

export default function WorldcoinPayment({
  params,
  searchParams,
}: WorldcoinPaymentProps) {
  return <WorldCoinPaymentView params={params} searchParams={searchParams} />;
}
