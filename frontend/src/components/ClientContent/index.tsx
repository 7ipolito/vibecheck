import { MiniKit } from "@worldcoin/minikit-js";
// import {
//   GetSearchedUsernameResult,
//   UsernameSearch,
// } from "@worldcoin/minikit-react";
import { User } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WalletAuth } from "./WalletAuth";
import { Login } from "@/features/Auth/Login";
import LoginPage from "@/app/login/page";

export const ClientContent = () => {
  return <LoginPage />;
};
