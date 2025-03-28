"use client";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export function DatePicker() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="space-y-2 opacity-50 cursor-not-allowed">
      <Label className="text-muted-foreground">When do you want go?</Label>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild disabled>
            <Button
              variant="outline"
              disabled
              className={cn(
                "flex-1 justify-start text-left font-normal cursor-not-allowed",
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
              disabled
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          className="flex-1 cursor-not-allowed"
          disabled
        >
          Any time
        </Button>
      </div>
    </div>
  );
}
