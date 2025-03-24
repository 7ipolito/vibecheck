"use client";
import React, { useState } from "react";

import Header from "@/entities/Dashboard/components/Header";
import DatePicker from "@/entities/Dashboard/components/DatePicker";
import EventCarousel from "@/entities/Dashboard/components/EventCarrousel";
import Stories from "@/entities/Dashboard/components/Stories";
function DashboardView() {
  return (
    <main className="flex min-h-screen flex-col p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <Header location={"Rio de Janeiro📍"} />

        <div className="space-y-2">
          <p>Where are people going tonight?</p>
          <Stories />
        </div>

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
