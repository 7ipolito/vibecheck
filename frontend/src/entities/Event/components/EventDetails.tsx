import { Calendar, Clock, MapPin } from "lucide-react";

export function EventDetails() {
  return (
    <div className="space-y-2">
      <div className="flex items-center text-sm">
        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>26/03/2025</span>
      </div>
      <div className="flex items-center text-sm">
        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>21:30</span>
      </div>
      <div className="flex items-center text-sm">
        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
        <span>Rio de Janeiro, Brazil</span>
      </div>
    </div>
  );
}
