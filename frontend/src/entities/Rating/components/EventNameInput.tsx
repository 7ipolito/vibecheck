// src/components/EventNameInput.tsx
import React from "react";

interface EventNameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventNameInput: React.FC<EventNameInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="event-name" className="block text-lg font-medium mb-2">
        Event name
      </label>
      <input
        id="event-name"
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
  );
};

export default EventNameInput;
