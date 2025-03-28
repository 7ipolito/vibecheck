"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "@/entities/Dashboard/components/EventCard";
import { GetPostParams } from "@/lib/actions/shared.types";

interface EventCarouselClientProps {
  initialEvents: GetPostParams[];
}

export function EventCarouselClient({
  initialEvents,
}: EventCarouselClientProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const handleSelect = (event: GetPostParams) => {
    router.push(`/event/${event._id}`);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => {
      api.off("select", handleSelect);
      clearInterval(autoplayInterval);
    };
  }, [api]);

  if (initialEvents.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-muted-foreground">No events found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {initialEvents.map((event) => (
            <CarouselItem key={event._id} className="md:basis-1/2 lg:basis-1/3">
              <EventCard
                onClick={() => handleSelect(event)}
                imageSrc={event.image}
                altText={event.name}
                title={event.name}
                hasAvailableTickets={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-2">
          {initialEvents.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                current === index ? "bg-primary" : "bg-muted"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
