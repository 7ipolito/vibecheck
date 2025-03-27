"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "@/entities/Dashboard/components/EventCard";
import { useRouter } from "next/navigation";

// Dados mockados dos eventos
const mockEvents = [
  {
    _id: "1",
    name: "Web3 Conference 2024",
    description: "The biggest Web3 conference in Latin America",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2940&auto=format&fit=crop",
    date: "2024-05-15",
    location: "Rio de Janeiro, RJ",
  },
  {
    _id: "2",
    name: "Blockchain Summit",
    description: "Explore the future of blockchain technology",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop",
    date: "2024-06-20",
    location: "São Paulo, SP",
  },
  {
    _id: "3",
    name: "Crypto Festival",
    description: "Music, art and cryptocurrency",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2940&auto=format&fit=crop",
    date: "2024-07-10",
    location: "Florianópolis, SC",
  },
  {
    _id: "4",
    name: "NFT Art Exhibition",
    description: "The largest NFT art exhibition in Brazil",
    image:
      "https://images.unsplash.com/photo-1638913662295-9630035ef770?q=80&w=2940&auto=format&fit=crop",
    date: "2024-08-05",
    location: "Belo Horizonte, MG",
  },
];

export default function BiggestEvents() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  const handleSelect = (event: any) => {
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

    // Auto-advance slides every 10 seconds
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => {
      api.off("select", handleSelect);
      clearInterval(autoplayInterval);
    };
  }, [api]);

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
          {mockEvents.map((event, index) => (
            <CarouselItem key={event._id} className="md:basis-1/2 lg:basis-1/3">
              <EventCard
                onClick={() => handleSelect(event)}
                imageSrc={event.image}
                altText={event.name}
                title={event.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-2">
          {mockEvents.map((_, index) => (
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
