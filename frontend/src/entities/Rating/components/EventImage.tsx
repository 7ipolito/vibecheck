// src/components/EventImage.tsx
import React from "react";

interface EventImageProps {
  src: string;
  alt: string;
}

const EventImage: React.FC<EventImageProps> = ({ src, alt }) => {
  return (
    <div className="mb-6 rounded-xl overflow-hidden ">
      <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">
        <img src={src} alt={alt} style={{ width: 100 }} />
      </div>
    </div>
  );
};

export default EventImage;
