// src/pages/event-rating.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventNameInput from "@/entities/Rating/components/EventNameInput";
import EventObservation from "@/entities/Rating/components/EventObservation";
import EventRating from "@/entities/Rating/components/EventRating";
import { ArrowLeft, Trash } from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import { ErrorFormTypes } from "@/enums/errors.enum";
import { Button } from "@/components/ui/button";

const EventRatingPage: React.FC = () => {
  const [rating, setRating] = useState<number>(1.5);
  const [eventName, setEventName] = useState("");
  const [observation, setObservation] = useState("");
  const [imageUploadedUrl, setImageUploadedUrl] = useState<string>("");
  const [imageUploadedError, setImageUploadedError] = useState<boolean>(false);

  const router = useRouter();

  const handleImageUploadComplete = (res: any) => {
    setImageUploadedError(false);
    setImageUploadedUrl(res[0].url);
    console.log("Files: ", res);
  };

  const handleImageUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  const handleSubmit = () => {};
  return (
    <div className="flex items-center justify-center p-4 relative">
      <div className="w-full  bg-white rounded-3xl relative">
        {/* Botão de voltar */}
        <button
          className="top-4 left-4 flex items-center text-gray-600 hover:text-gray-800 transition-colors pb-4"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Componente de upload de imagem */}
        <div>
          {imageUploadedUrl ? (
            <div className="flex justify-center">
              <img src={imageUploadedUrl} width={100} alt="Imagem do Evento" />
            </div>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleImageUploadComplete}
              onUploadError={handleImageUploadError}
            />
          )}

          {imageUploadedError && (
            <span role="errorImageRole" className="text-red-500">
              {ErrorFormTypes.ERROR_IMAGE}
            </span>
          )}

          {imageUploadedUrl && (
            <button
              onClick={() => {
                setImageUploadedUrl(""); // Limpar a URL da imagem
              }}
              className="mt-20 text-blue-500 flex items-center"
            >
              <Trash className="mr-2 w-5 h-5 text-red-700 " />
              Clear image
            </button>
          )}
        </div>

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
        <div>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default EventRatingPage;
