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

interface DatePickerProps {
  date?: Date | null;
  setDate?: (date: Date | null) => void;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <div className="space-y-2">
      <p>When do you want to go?</p>
      <div className="grid grid-cols-2 gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
        </Popover>
        <Button variant="outline">Any time</Button>
      </div>
    </div>
  );
}
