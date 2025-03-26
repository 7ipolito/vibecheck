interface OrderSummaryProps {
  eventName: string;
  ticketType: string;
  price: string;
}

export default function OrderSummary({
  eventName,
  ticketType,
  price,
}: OrderSummaryProps) {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h2 className="font-medium">Order Summary</h2>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Event:</span>
          <span className="text-sm font-medium">{eventName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Ticket Type:</span>
          <span className="text-sm font-medium">{ticketType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Price:</span>
          <span className="text-sm font-medium">
            R${" "}
            {Number.parseFloat(price).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
