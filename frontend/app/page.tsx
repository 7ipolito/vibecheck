import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <img
            src="/vibecheck.webp"
            alt="Icone Logo"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">VibeCheck</h1>
        <p className="text-muted-foreground">
          Find and purchase tickets for events selected by special users
        </p>
        <div className="flex flex-col space-y-4">
          <Link href="/tutorial">
            <Button className="w-full">Get Started</Button>
          </Link>
          <Link href="/search">
            <Button variant="outline" className="w-full">
              Skip Tutorial
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
