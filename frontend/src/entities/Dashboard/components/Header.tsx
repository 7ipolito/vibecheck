import { Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  location: string;
}

export default function Header({ location }: HeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold">{location}</h1>
      <button
        onClick={() => router.push("/my-tickets")}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
      >
        <Ticket className="h-5 w-5" />
        <span className="text-sm">My Tickets</span>
      </button>
    </div>
  );
}
