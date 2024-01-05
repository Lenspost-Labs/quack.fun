import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "../Items/SidebarItem";
// @ts-ignore
import BsHouse from "@meronex/icons/bs/BsHouse";
// @ts-ignore
import MdNotificationsOutline from "@meronex/icons/ios/MdNotificationsOutline";
// @ts-ignore
import MdCreate from "@meronex/icons/ios/MdCreate";

const BottomNavbar = () => {
  return (
    <>
      {/* Mobile View Bottom Bar */}
      <div className="fixed bottom-0 w-full flex justify-between bg-white p-2 px-4 md:hidden">
        <Link to="/feed">
          <SidebarItem
            itemName="Home"
            onClick
            dashIcon={<BsHouse color="#000" />}
          />
        </Link>

        <Link to="/notifications">
          <SidebarItem
            itemName="Notifications"
            dashIcon={<MdNotificationsOutline color="#000" />}
          />
        </Link>

        {/* <Link to="/new"> */}

        <SidebarItem
          onClickFn={() => console.log("new post")}
          itemName="New Post"
          dashIcon={<MdCreate color="#000" />}
        />
        {/* </Link> */}
      </div>
    </>
  );
};

export default BottomNavbar;
