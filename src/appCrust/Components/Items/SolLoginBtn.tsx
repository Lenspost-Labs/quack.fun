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

// Using notification as `alert` in this component
import { Button, Popover, Tooltip, notification as alert } from "antd";
import MdPower from "@meronex/icons/ios/MdPower";
import { Link } from "react-router-dom";
// @ts-ignore
import MdMore from "@meronex/icons/ios/MdMore";
// @ts-ignore
import CgArrowsExchangeV from "@meronex/icons/cg/CgArrowsExchangeV";
// ts-ignore
import MdContentCopy from "@meronex/icons/md/MdContentCopy";

export const SolLoginBtn: FC = () => {
  return (
    <SolLoginBtnContext>
      <SolLoginBtnUI />
    </SolLoginBtnContext>
  );
};

const SolLoginBtnContext: FC<{ children: ReactNode }> = ({ children }) => {
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

const SolLoginBtnUI: FC = () => {
  const { publicKey: address } = useWallet();
  const { connected, disconnect, publicKey, select } = useWallet();
  const [api, contextHolder] = alert.useNotification();

  console.log(connected);
  console.log(address);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
    }
    openAlert({
      alertTitle: "Copied address to clipboard",
      alertDesc: "",
    });
  };

  const openAlert = ({
    alertTitle,
    alertDesc,
  }: {
    alertTitle: string;
    alertDesc: string;
  }) => {
    api.success({
      message: alertTitle,
      description: alertDesc,
      duration: 1,
      className: "colorBgBlur",
    });
  };

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
            <Link to="/profile">
              <SidebarItem
                itemName="@Username"
                userPicture={"https://i.pravatar.cc/24?img=3"}
              />
            </Link>

            <div className="">
              <Popover
                placement="bottom"
                content={
                  <div className="flex flex-col">
                    {/* <Button
                      onClick={() => select}
                      className="mr-2 mb-2"
                      icon={<CgArrowsExchangeV size={16}/>}
                    >
                      Change Wallet
                    </Button> */}
                    <Button
                      onClick={handleCopy}
                      className="mr-2"
                      icon={<MdContentCopy  />}
                    >
                      {address?.toString().slice(0, 6) +
                        "..." +
                        address?.toString().slice(-4)}
                    </Button>
                  </div>
                }
              >
                {" "}
                {/* <Tooltip  open={ true} title="Wallet Options"> */}
                <Button
                  className="mr-2"
                  // onClick={() => select}
                  icon={<MdMore />}
                ></Button>
                {/* </Tooltip> */}
              </Popover>

              <Tooltip title="Disconnect">
                <Button
                  className="mr-2"
                  onClick={disconnect}
                  icon={<MdPower />}
                ></Button>
              </Tooltip>
            </div>
          </div>

          {contextHolder}
        </>
      )}
    </>
  );
};
