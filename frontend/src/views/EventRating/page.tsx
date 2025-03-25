// src/pages/event-rating.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventImage from "@/entities/Rating/components/EventImage";
import EventNameInput from "@/entities/Rating/components/EventNameInput";
import EventObservation from "@/entities/Rating/components/EventObservation";
import EventRating from "@/entities/Rating/components/EventRating";
import SubmitButton from "@/entities/Rating/components/SubmitButton";
import { ArrowLeft } from "lucide-react";

const EventRatingPage: React.FC = () => {
  const [rating, setRating] = useState<number>(1.5);
  const [eventName, setEventName] = useState("");
  const [observation, setObservation] = useState("");

  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 relative">
        {/* Botão de voltar */}
        <button
          className="top-4 left-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors pb-4"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <EventImage
          src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/08/3a/a7/15.jpg"
          alt="Event"
        />

        <div className="space-y-6">
          <EventNameInput
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <EventRating rating={rating} onChange={setRating} />
          <EventObservation
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
        </div>

        <SubmitButton />
      </div>
    </div>
  );
};

export default EventRatingPage;
