import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function FavoriteButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Button className="h-14 w-14 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center">
        <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
      </Button>
    </div>
  );
}
