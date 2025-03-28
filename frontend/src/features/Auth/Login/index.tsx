"use client";
import { MiniKit, WalletAuthInput } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useCallback, useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { createUser, getUserData } from "@/lib/actions/user.action";
import { storage } from "@/lib/storage";

const walletAuthInput = (nonce: string): WalletAuthInput => {
  return {
    nonce,
    requestId: "0",
    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    statement:
      "This is my statement and here is a link https://worldcoin.com/apps",
  };
};

type User = {
  walletAddress: string;
  username: string | null;
  profilePictureUrl: string | null;
};

export const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para erros
  const router = useRouter();

  const refreshUserData = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/me");
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data.");
    }
  }, []);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  useEffect(() => {
    // Ensure the code only runs on the client side
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();

      const { finalPayload } = await MiniKit.commandsAsync.walletAuth(
        walletAuthInput(nonce)
      );

      if (finalPayload.status === "error") {
        setLoading(false);
        setError("Error during WorldID authentication.");
        return;
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: finalPayload,
            nonce,
          }),
        });

        if (response.status === 200) {
          if (!MiniKit.user?.walletAddress) {
            setError("Wallet address is missing.");
            setLoading(false);
            return;
          }

          const createUserResponse = await createUser({
            walletAddress: MiniKit.user.walletAddress,
            image:
              MiniKit.user?.profilePictureUrl ||
              "https://avatars.githubusercontent.com/u/45522944?v=4",
            username: MiniKit.user?.username,
          });

          // Salvar walletAddress após criar usuário
          storage.setWalletAddress(MiniKit.user.walletAddress);

          console.log(storage.getWalletAddress());

          // Redireciona somente se a criação do usuário foi bem-sucedida
          router.push("/dashboard");
        } else {
          setError("Failed to log in.");
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error during login.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Error during logout.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-col space-y-4 ">
        <div className="flex flex-col items-center space-y-4">
          {error && (
            <div className="text-red-500 text-sm p-2">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        <div
          className="w-full  text-white p-4 "
          style={{ backgroundColor: "black" }}
        >
          <button onClick={handleLogin} disabled={loading} className="flex-row">
            {loading ? "Connecting..." : "Login with WorldID"}
          </button>
        </div>
      </div>
    </div>
  );
};
