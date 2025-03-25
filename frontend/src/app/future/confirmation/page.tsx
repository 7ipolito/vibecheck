import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <Card>
          <CardContent className="p-8 flex flex-col items-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Payment Completed</h1>
            <p className="text-muted-foreground">
              Your tickets have been sent to your email
            </p>

            <div className="w-full pt-4 border-t mt-4">
              <div className="space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span>Music Festival</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>April 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tickets</span>
                  <span>1 × Regular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">R$ 85,00</span>
                </div>
              </div>
            </div>

            <div className="w-full pt-6">
              <Link href="/">
                <Button className="w-full">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
