"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function VerificationPage() {
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setVerifying(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-2xl font-bold">Verify with World ID</h1>

        <Card>
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            <div className="relative w-24 h-24">
              <Image
                src="/placeholder.svg?height=96&width=96"
                alt="World ID"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              World ID is requesting access to your wallet
            </p>

            {verifying ? (
              <div className="flex flex-col items-center space-y-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p>Verifying...</p>
              </div>
            ) : (
              <Link href="/confirmation">
                <Button className="w-full">Continue</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
