import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Tutorial() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to VibeCheck
        </h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Find Events</h2>
            <p className="text-muted-foreground">
              Search for events in your city or browse by category
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Book Tickets</h2>
            <p className="text-muted-foreground">
              Select your preferred date and number of tickets
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Secure Payment</h2>
            <p className="text-muted-foreground">
              Pay securely and receive your tickets instantly
            </p>
          </div>
        </div>
        <Link href="/search">
          <Button className="w-full">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
