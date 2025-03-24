import React, { useState } from "react";

import Header from "@/entities/Dashboard/components/Header";
import DatePicker from "@/entities/Dashboard/components/DatePicker";
import EventCarousel from "@/entities/Dashboard/components/EventCarrousel";
function DashboardView() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Header location={"São Paulo📍"} />

        <DatePicker />

        <div className="space-y-4">
          <h2 className="font-medium">What's good?</h2>
          <div className="space-y-4">
            <EventCarousel />
          </div>
        </div>
      </div>
    </main>
  );
}

export default DashboardView;
