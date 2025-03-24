"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { StoryCard } from "./StoryCard";
import { Plus } from "lucide-react";
import AddParty from "./AddParty";
import { useRouter } from "next/navigation";

// Sample data for stories
const stories = [
  {
    id: 1,
    username: "Neymar",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Neymar_Junior.png",
    viewed: false,
  },
  {
    id: 2,
    username: "Allan",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIvMQ-dCzNRMgk4jtdDpEcpJPRLO8wh4Uo7eiw6_wiWPK21pVnCBg=s576-c-no",
    viewed: false,
  },
  // ... other stories
];

export default function Stories() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);
  const router = useRouter();

  const handleStoryClick = (id: number) => {
    console.log(`Story with id ${id} clicked`);
  };

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const handleAddStory = () => {
    // Aqui você pode adicionar a lógica para criar um novo story
    router.push("rating");
    console.log("Adicionar novo story");
  };

  return (
    <div className="mb-6">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: false,
          dragFree: false,
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent className="-ml-4">
          <CarouselItem className="pl-4 basis-[80px] md:basis-[88px]">
            <AddParty handleAddStory={handleAddStory} />
          </CarouselItem>
          {stories.map((story) => (
            <CarouselItem
              key={story.id}
              className="pl-4 basis-[80px] md:basis-[88px]"
            >
              <StoryCard story={story} handleClick={handleStoryClick} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
