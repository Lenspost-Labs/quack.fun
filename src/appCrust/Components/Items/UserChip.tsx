import React from "react";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import { Button, Popover, Tooltip } from "antd";
import { utilCopyToClip } from "../Utils/functions/utilCopyToClip";
import { useWallet } from "@solana/wallet-adapter-react";
import MdPower from "@meronex/icons/ios/MdPower";
import MdMore from "@meronex/icons/ios/MdMore";
import MdContentCopy from "@meronex/icons/md/MdContentCopy";
import quackLogo from "../../../assets/Logos/quackLogo.jpg";

const UserChip = ({ propFnOnDisconnect }) => {
  const { publicKey: address } = useWallet();

  return (
    <div className="flex justify-between items-center align-middle ">
      <Link to={`/${localStorage.getItem("fid")}`}>
        <SidebarItem
          className="hidden md:inline-block"
          itemName={
            `${localStorage.getItem("username") as string}` || "quackuser"
          }
          userPicture={quackLogo}
        />
        <img
          src={quackLogo}
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
                  onClick={propFnOnDisconnect}
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
            onClick={propFnOnDisconnect}
            icon={<MdPower />}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default UserChip;
