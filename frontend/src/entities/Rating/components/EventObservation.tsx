// src/components/EventObservation.tsx
import React from "react";

interface EventObservationProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EventObservation: React.FC<EventObservationProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor="observation" className="block text-lg font-medium mb-2">
        Observation
      </label>
      <textarea
        id="observation"
        value={value}
        onChange={onChange}
        rows={3}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};

export default EventObservation;
