import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan"; // Adicione esta linha
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

// Verificar variáveis de ambiente
const METAMASK_API_KEY = process.env.METAMASK_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!METAMASK_API_KEY || !PRIVATE_KEY) {
  throw new Error(
    "Por favor, configure as variáveis de ambiente no arquivo .env"
  );
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${METAMASK_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // Para o Etherscan, use 'verify' em vez de 'etherscan'

  etherscan: {
    apiKey: METAMASK_API_KEY,
  },
};

export default config;
