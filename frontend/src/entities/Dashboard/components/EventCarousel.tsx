import { Suspense } from "react";
import { GET_POSTS } from "@/graphql/queries";
import client from "@/lib/client";
import { EventCarouselClient } from "./EventCarouselClient";
import { CarouselSkeleton } from "./skeletons/CarouselSkeleton";

async function getEvents() {
  try {
    const { data } = await client.query({
      query: GET_POSTS,
      fetchPolicy: "network-only",
    });
    return data.posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function EventCarousel() {
  const events = await getEvents();

  return (
    <Suspense fallback={<CarouselSkeleton />}>
      <EventCarouselClient initialEvents={events} />
    </Suspense>
  );
}
