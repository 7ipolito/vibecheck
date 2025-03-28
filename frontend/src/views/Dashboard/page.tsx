"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Header from "@/entities/Dashboard/components/Header";
import DatePicker from "@/entities/Dashboard/components/DatePicker";
import EventCarousel from "@/entities/Dashboard/components/EventCarrousel";
import Stories from "@/entities/Dashboard/components/Stories";
import loading from "./loading";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import BiggestEvents from "@/entities/Dashboard/components/BiggestEvents";
import { storage } from "@/lib/storage";

function DashboardView() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Tenta fazer logout na API
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed on server");
      }

      // Se o logout na API foi bem sucedido, limpa o localStorage
      try {
        storage.clearWalletAddress();
      } catch (storageError) {
        console.error("Error clearing local storage:", storageError);
        // Continua com o redirecionamento mesmo se falhar a limpeza do storage
      }

      // Redireciona para login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Tenta limpar o storage e redirecionar mesmo se o logout na API falhar
      try {
        storage.clearWalletAddress();
        router.push("/login");
      } catch (finalError) {
        console.error("Critical error during logout:", finalError);
      }
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
          <h2 className="font-medium">Biggest events in Rio de janeiro 🔥</h2>

          <BiggestEvents />
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
