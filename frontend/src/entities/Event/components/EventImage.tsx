interface EventImageProps {
  src: string;
  alt: string;
}

export function EventImage({ src, alt }: EventImageProps) {
  return (
    <div className="relative w-full h-48 rounded-lg overflow-hidden">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
