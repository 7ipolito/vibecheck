"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/entities/Dashboard/components/Header";
import DatePicker from "@/entities/Dashboard/components/DatePicker";
import EventCarousel from "@/entities/Dashboard/components/EventCarrousel";
import Stories from "@/entities/Dashboard/components/Stories";
import loading from "./loading";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

function DashboardView() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
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
          <h2 className="font-medium">Hot events today 🔥</h2>

          <EventCarousel />
        </div>

        <div className="space-y-4">
          <h2 className="font-medium">Tickets sale 🏷️ </h2>

          <EventCarousel />
        </div>

        <Button onClick={handleLogout} variant="secondary" size="md">
          SignOut
        </Button>
      </div>
    </main>
  );
}

export default DashboardView;
