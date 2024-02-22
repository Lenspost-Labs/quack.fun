// Import statements remain unchanged
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { FC } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import SidebarItem from "./SidebarItem";
import { Button, Popover, Tooltip, message } from "antd";
import MdPower from "@meronex/icons/ios/MdPower";
import { Link } from "react-router-dom";
import MdMore from "@meronex/icons/ios/MdMore";
import MdContentCopy from "@meronex/icons/md/MdContentCopy";
import { utilCopyToClip } from "../Utils/functions/utilCopyToClip";
import { UtilLoginToApp } from "../Utils/components/utilLoginToApp";
import useUser from "src/hooks/userHooks/useUser";

const SolLoginBtn: FC = () => {
  const { connected, disconnect, publicKey: address } = useWallet();
  const { userData, fid } = useUser();
  const [hasLoggedInBtnContext, setHasUserLoggedInBtnContext] = useState(false);

  const handleDisconnect = () => {
    message.success("Disconnected");
    disconnect();
    setHasUserLoggedInBtnContext(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("fid");
  };

  const fnCheckLocalStorage = () => {
    if (
      localStorage.getItem("jwt") !== null &&
      localStorage.getItem("fid") !== null
    ) {
      setHasUserLoggedInBtnContext(true);
    } else {
      setHasUserLoggedInBtnContext(false);
    }
  };

  useEffect(() => {
    fnCheckLocalStorage();
  }, [connected]);

  useEffect(() => {
    fnCheckLocalStorage();
  }, []);

  return (
    <>
      {!connected && (
        <WalletMultiButton>
          <div className="hidden md:flex justify-center">Select Wallet</div>
          <div className="md:hidden m-2 w-20"> Connect</div>
        </WalletMultiButton>
      )}
      {connected && (
        <div className="flex justify-between items-center align-middle ">
          <Link to={`/${localStorage.getItem("fid")}`}>
            <SidebarItem
              className="hidden md:inline-block"
              itemName={
                `${(userData as { username?: string })?.username}` ||
                "quackuser"
              }
              userPicture={"https://i.pravatar.cc/24?img=3"}
            />
            <img
              src="https://i.pravatar.cc/24?img=3"
              className="inline-block md:hidden rounded-full mx-4 w-8 h-8"
              alt=""
            />
          </Link>
          <div className="">
            <Popover
              placement="bottom"
              content={
                <div className="flex flex-col">
                  <Button
                    onClick={() =>
                      utilCopyToClip(address ? address.toString() : "")
                    }
                    className="mr-2"
                    icon={<MdContentCopy />}
                  >
                    {address?.toString().slice(0, 6) +
                      "..." +
                      address?.toString().slice(-4)}
                  </Button>
                  <Tooltip title="Disconnect">
                    <Button
                      className="md:hidden mr-2 mt-2"
                      onClick={handleDisconnect}
                      icon={<MdPower />}
                    >
                      Disconnect
                    </Button>
                  </Tooltip>
                </div>
              }
            >
              <Button className="mr-2" icon={<MdMore />} />
            </Popover>
            <Tooltip title="Disconnect">
              <Button
                className="hidden md:inline-block mr-2"
                onClick={handleDisconnect}
                icon={<MdPower />}
              />
            </Tooltip>
          </div>
        </div>
      )}
      {!hasLoggedInBtnContext && <UtilLoginToApp />}
    </>
  );
};

export default SolLoginBtn;
