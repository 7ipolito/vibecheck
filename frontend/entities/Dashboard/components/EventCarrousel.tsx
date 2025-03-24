"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "../components/EventCard";
import { GET_POSTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { GetPostParams } from "@/lib/actions/shared.types";

// Sample event data - replace with your actual data
const events = [
  {
    imageSrc:
      "https://espacohall.com.br/wp-content/uploads/2024/05/Espaco-Hall-1.png",
    altText: "Espaço Hall",
    title: "Espaço Hall",
    date: "Sat, Apr 15",
    location: "Barra Music, Rio de Janeiro",
  },
  {
    imageSrc: "https://i.ytimg.com/vi/AREa-j42X_4/maxresdefault.jpg",
    altText: "Rio de Janeiro",
    title: "Pagode do adame",
    date: "Sun, Apr 16",
    location: "Lapa, Rio de Janeiro",
  },
  {
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/e/ea/Shopping_Center_Grandes_Galerias_-_Galeria_do_Rock_3.jpg",
    altText: "Galeria do Rock",
    title: "Galeria do Rock",
    date: "Fri, Apr 21",
    location: "The Week, Rio de Janeiro",
  },
  {
    imageSrc:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/0a/96/c6/rio-de-janeiro.jpg?w=1800&h=-1&s=1",
    altText: "São Paulo",
    title: "Exposição de Arte Contemporânea",
    date: "Mon, Apr 24",
    location: "CCBB, São Paulo",
  },
];

export default function EventCarousel() {
  const [postsData, setPostsData] = useState<GetPostParams[]>([]);

  const { data: posts, loading } = useQuery(GET_POSTS);

  useEffect(() => {
    if (posts && posts.posts) {
      setPostsData(posts.posts);
    }
  }, [posts]);

  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    // Auto-advance slides every 3 seconds
    const autoplayInterval = setInterval(() => {
      api.scrollNext();
    }, 3000);

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
          {postsData.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <EventCard
                imageSrc={event.image}
                altText={event.name}
                title={event.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-1 mt-2">
          {postsData.map((_, index) => (
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
