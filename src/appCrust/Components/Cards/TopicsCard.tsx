import React from "react";
import SidebarItem from "../Items/SidebarItem.tsx";

const TopicsCard : React.FC = () => {
  return (
    <>
      <ul className="flex flex-1 flex-col gap-1 py-1 bg-white rounded-lg">
        <h3 className="p-6 pb-0 text-sm font-medium text-slate-400">Topics</h3>
        <hr className="border-slate-200 mt-2 mb-1" />
        <SidebarItem itemName={"trending"} />
        <SidebarItem itemName={"#solgram"} />
        <SidebarItem itemName={"#popular"} />
        <SidebarItem itemName={"#btc45k"} />
      </ul>
    </>
  );
};

export default TopicsCard;
