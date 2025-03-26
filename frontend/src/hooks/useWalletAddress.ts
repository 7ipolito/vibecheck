import { MiniKit } from "@worldcoin/minikit-js";

export const useWalletAddress = async () => {
  try {
    const address = await MiniKit.user?.walletAddress;
    return address;
  } catch (error) {
    console.error("Error getting wallet address:", error);
    return null;
  }
};
