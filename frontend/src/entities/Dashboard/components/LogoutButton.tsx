"use client";
import { storage } from "@/lib/storage";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import router from "next/router";
import React from "react";

export const LogoutButton = () => {
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
    <Button onClick={handleLogout} variant="secondary" size="md">
      SignOut
    </Button>
  );
};

export default LogoutButton;
