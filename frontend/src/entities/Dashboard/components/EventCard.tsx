import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  date?: string;
  location?: string;
}

export default function EventCard({
  imageSrc,
  altText,
  title,
  date,
  location,
}: EventCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl border-2">
      <CardContent className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={altText}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
            <p className="text-white text-sm font-medium">{title}</p>
            {date && location && (
              <p className="text-white/80 text-xs">
                {date} • {location}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
