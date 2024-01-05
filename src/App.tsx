import React from "react";
import MainAppLayout from "../src/appCrust/Layouts/MainAppLayout.tsx";
import { SolLogin } from "./appCrust/Components/Items/SolLoginBtn.tsx";

const App : React.FC<any> = () => {
  return (
    <>
      <MainAppLayout />
      {/* <SolLogin/> */}
    </>
  );
}

export default App;

// https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git
// TS - Case sensitive only filename changes in git

// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import {
//   WalletModalProvider,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
// import { clusterApiUrl } from "@solana/web3.js";
// import type { FC, ReactNode } from "react";
// import React, { useMemo } from "react";

// const Context: FC<{ children: ReactNode }> = ({ children }) => {
//   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//   const network = WalletAdapterNetwork.Devnet;

//   // You can also provide a custom RPC endpoint.
//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//   const wallets = useMemo(
//     () => [
//       new UnsafeBurnerWalletAdapter(),
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [network]
//   );

//   return (
//     <ConnectionProvider endpoint={endpoint}>
//       <WalletProvider wallets={wallets} autoConnect>
//         <WalletModalProvider>{children}</WalletModalProvider>
//       </WalletProvider>
//     </ConnectionProvider>
//   );
// };

// const Content: FC = () => {
//   return <WalletMultiButton />;
// };

// const App: FC = () => {
//   return (
//     <Context>
//       <Content />
//     </Context>
//   );
// };

// export default App;
