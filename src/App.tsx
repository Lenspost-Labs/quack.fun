import React, { useEffect, useMemo } from "react";
import MainAppLayout from "../src/appCrust/Layouts/MainAppLayout.tsx";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import useUser from "./hooks/userHooks/useUser.tsx";
import useUserAuth from "./hooks/apisHooks/userAuth/useUserAuth.tsx";
import { useNavigate } from "react-router-dom";

const App: React.FC<any> = () => {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);
  const { setJwt, setFid } = useUser();

  useEffect(() => {
    const checkAndUpdateLocalStorage = () => {
      setJwt(localStorage.getItem("jwt"));
      setFid(localStorage.getItem("fid"));
      console.log("Fid updated from Local");
    };
    const intervalId = setInterval(checkAndUpdateLocalStorage, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MainAppLayout />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
};

export default App;

// https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git
// TS - Case sensitive only filename changes in git
