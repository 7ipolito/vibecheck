import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Header from "@/entities/Dashboard/components/Header";
import DatePicker from "@/entities/Dashboard/components/DatePicker";
import EventCarousel from "@/entities/Dashboard/components/EventCarrousel";
import Stories from "@/entities/Dashboard/components/Stories";
import loading from "./loading";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import BiggestEvents from "@/entities/Dashboard/components/BiggestEvents";
import { storage } from "@/lib/storage";
import { CarouselSkeleton } from "@/entities/Dashboard/components/skeletons/CarouselSkeleton";
import { DatePickerSkeleton } from "@/entities/Dashboard/components/skeletons/DatePickerSkeleton";
import { HeaderSkeleton } from "@/entities/Dashboard/components/skeletons/HeaderSkeleton";
import LogoutButton from "@/entities/Dashboard/components/LogoutButton";

function DashboardView() {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simular tempo de carregamento
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <main className="flex min-h-screen flex-col p-4">
  //       <div className="w-full max-w-md mx-auto space-y-6">
  //         <HeaderSkeleton />
  //         <DatePickerSkeleton />

  //         <div className="space-y-4">
  //           <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
  //           <CarouselSkeleton />
  //         </div>

  //         <div className="space-y-4">
  //           <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
  //           <CarouselSkeleton />
  //         </div>
  //       </div>
  //     </main>
  //   );

  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Header location={"Rio de Janeiro📍"} />

        {/* <div className="space-y-2">
          <p>Where are people going tonight?</p>
          <Stories />
        </div> */}

        <DatePicker />

        <div className="space-y-4">
          <h2 className="font-medium">Biggest events in Rio de janeiro 🔥</h2>

          <BiggestEvents />
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Tickets sale 🏷️ </h2>

          <EventCarousel />
        </div>

        <LogoutButton />
      </div>
    </main>
  );
}

export default DashboardView;
