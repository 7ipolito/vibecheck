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
import { GET_POSTS } from "@/graphql/queries";
import { GetPostParams } from "@/lib/actions/shared.types";
import client from "@/lib/client"; // Certifique-se de ter configurado o client Apollo corretamente
import { useRouter } from "next/navigation";
import { CarouselSkeleton } from "./skeletons/CarouselSkeleton";

export default function EventCarousel() {
  const [postsData, setPostsData] = useState<GetPostParams[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.query({ query: GET_POSTS });
        setPostsData(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSelect = (event: GetPostParams) => {
    router.push(`/event/${event._id}`);
  };

  useEffect(() => {
    if (!api) return;

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

  // const hasAvailableTickets = (event: GetPostParams) => {
  //   return (
  //     event.tickets &&
  //     event.tickets.length > 0 &&
  //     event.tickets.some((ticket) => ticket.status !== "sold")
  //   );
  // };

  if (loading) {
    return <CarouselSkeleton />;
  }

  if (!postsData.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-muted">No events found.</p>
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
          {postsData.map((event, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <EventCard
                onClick={() => handleSelect(event)}
                imageSrc={event.image}
                altText={event.name}
                title={event.name}
                hasAvailableTickets={true}
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
