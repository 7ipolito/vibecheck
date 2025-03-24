"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState("São Paulo");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{location}</h1>
          <div className="relative"></div>
        </div>

        <div className="space-y-2">
          <Label>When do you want to go?</Label>
          <div className="grid grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline">Any time</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Hot Events 🔥</h2>
          <div className="space-y-4">
            <Link href="/event/1">
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Music Festival</h3>
                    <p className="text-sm text-muted-foreground">
                      Sat, Apr 15 • Ibirapuera Park
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/event/2">
              <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Food & Wine Festival</h3>
                    <p className="text-sm text-muted-foreground">
                      Sun, Apr 16 • Downtown
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
        <Button onClick={handleLogout} variant="secondary">
          SignOut
        </Button>
      </div>
    </main>
  );
}
