"use client";

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
import { Login } from "./Login";
import LoginPage from "@/app/login/page";

const VersionsNoSSR = dynamic(
  () => import("./Versions").then((comp) => comp.Versions),
  { ssr: false }
);

export const ClientContent = () => {
  const [isI, setIsI] = useState(false);
  useEffect(() => {
    setIsI(MiniKit.isInstalled());
  }, []);
  return (
    <div>
      <LoginPage />
    </div>
  );
};
