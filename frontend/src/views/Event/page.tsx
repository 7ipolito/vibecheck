import { Suspense } from "react";
import { EventView } from "./EventView";
import { EventSkeleton } from "@/entities/Event/components/skeletons/EventSkeleton";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <Suspense fallback={<EventSkeleton />}>
        <EventView params={params} />
      </Suspense>
    </main>
  );
}
