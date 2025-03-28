import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  date?: string;
  location?: string;
  onClick: () => void;
  hasAvailableTickets: boolean;
}

export default function EventCard({
  imageSrc,
  altText,
  title,
  date,
  location,
  onClick,
  hasAvailableTickets,
}: EventCardProps) {
  return (
    <Card
      className={`
        overflow-hidden rounded-xl border-2 h-[630px] flex flex-col
        ${!hasAvailableTickets ? "cursor-not-allowed" : "hover:shadow-lg"}
        transition-all duration-300
      `}
      onClick={hasAvailableTickets ? onClick : undefined}
    >
      <CardContent className="p-0 flex-grow relative h-full">
        <div className="relative w-full h-full">
          <div
            style={{
              width: "100%",
              height: "150px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={imageSrc || "/placeholder.svg"}
              alt={altText}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Corta a imagem para preencher o espaço
                display: "block", // Remove espaços indesejados abaixo da imagem
              }}
              className={`
                ${!hasAvailableTickets ? "opacity-50" : "group-hover:scale-105"}
                transition-transform duration-300
              `}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 bg-white">
            <p className="text-black text-sm font-medium truncate">{title}</p>
            {date && location && (
              <p className="text-white/80 text-xs truncate">
                {date} • {location}
              </p>
            )}
          </div>
          {!hasAvailableTickets && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center"></div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
