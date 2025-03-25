// src/components/EventRating.tsx
import React from "react";
import { Rating } from "@smastrom/react-rating";

interface EventRatingProps {
  rating: number;
  onChange: (value: number) => void;
}

const EventRating: React.FC<EventRatingProps> = ({ rating, onChange }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-lg font-medium mb-3">
        Could you give a human unique rating of this place?
      </p>
      <div className="flex justify-center px-4 items-center">
        <Rating style={{ maxWidth: 250 }} value={rating} onChange={onChange} />
      </div>
    </div>
  );
};

export default EventRating;
