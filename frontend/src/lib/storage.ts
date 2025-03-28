export const STORAGE_KEYS = {
  WALLET_ADDRESS: "walletAddress",
} as const;

export const storage = {
  setWalletAddress: (address: string) => {
    localStorage.setItem(STORAGE_KEYS.WALLET_ADDRESS, address);
  },

  getWalletAddress: () => {
    return "0x414f9c8d7bb92d91c1d897fa0df4d5d5477593ed";
  },

  clearWalletAddress: () => {
    localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
  },
};
