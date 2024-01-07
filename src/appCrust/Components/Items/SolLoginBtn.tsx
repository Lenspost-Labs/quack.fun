// Documentation for Solana wallet providers:
// https://github.com/solana-labs/wallet-adapter
/**
 * Wallets that implement either of these standards will be available automatically.
 *
 *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
 *     (https://github.com/solana-mobile/mobile-wallet-adapter)
 *   - Solana Wallet Standard
 *     (https://github.com/solana-labs/wallet-standard)
 *
 * If you wish to support a wallet that supports neither of those standards,
 * instantiate its legacy wallet adapter here. Common legacy adapters can be found
 * in the npm package `@solana/wallet-adapter-wallets`.
 */
import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import SidebarItem from "./SidebarItem";
import { Button, Tooltip } from "antd";
import MdPower from "@meronex/icons/ios/MdPower";

export const SolLogin: FC = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  const { publicKey: address } = useWallet();
  const { connected, disconnect } = useWallet();

  console.log(connected);
  console.log(address);
  return (
    <>
      {!connected && (
        <>
          <div className="mr-2 w-full">
            <WalletMultiButton />
          </div>
        </>
      )}
      {connected && (
        <>
          <div className="flex justify-between items-center align-middle ">
            <SidebarItem
              onClickFn={disconnect}
              itemName="@Username"
              userPicture={"https://i.pravatar.cc/24?img=3"}
            />

            <Tooltip title="Disconnect">
              <Button
                className="mr-2"
                onClick={disconnect}
                icon={<MdPower />}
              ></Button>
            </Tooltip>
          </div>
        </>
      )}
    </>
  );
};
