import React from "react";
import { useState } from "react";
// @ts-ignore
import BsHouse from "@meronex/icons/bs/BsHouse";
// @ts-ignore
import MdNotificationsOutline from "@meronex/icons/ios/MdNotificationsOutline";
// @ts-ignore
import MdCreate from "@meronex/icons/ios/MdCreate";
// ts-ignore
import MdPower from "@meronex/icons/ios/MdPower";

import { Link } from "react-router-dom";
import NewPostCard from "../../Components/Cards/NewPostCard.tsx";
import ProfileCard from "../../Components/Cards/ProfileCard.tsx";
import SidebarItem from "../../Components/Items/SidebarItem.tsx";
import { Modal } from "antd";

const LeftSidebar: React.FC<any> = () => {
  const [isSideNavOpen] = useState(true);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);

 const showModal = () => {
    setIsBasicModalOpen(true);
  };
  const closeModal = () => {
    setIsBasicModalOpen(false);
  };

  return (
    <>
      {/*  <!-- Mobile trigger --> */}
      {/* <button
        title="Side navigation"
        type="button"
        className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
          isSideNavOpen
            ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
            : ""
        }`}
        aria-haspopup="menu"
        aria-label="Side navigation"
        aria-expanded={isSideNavOpen ? "true" : "false"}
        aria-controls="nav-menu-5"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <div onClick={() => setIsSideNavOpen(!isSideNavOpen)}>Click me</div>
        <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
          ></span>
        </div>
      </button> */}

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-5"
        aria-label="Side navigation"
        className={`relative top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <ProfileCard />
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
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
              <div>
                <SidebarItem
                  onClickFn={showModal}
                  itemName="New Post"
                  dashIcon={<MdCreate color="#000" />}
                />
              </div>
              {/* </Link> */}
            </ul>
          </div>

          <div>
            <h3 className="p-6 pb-0 text-sm font-medium text-slate-400">
              Recent Contacts
            </h3>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <SidebarItem
                statusIcon
                itemName="Jeff Bezos"
                userPicture={"https://i.pravatar.cc/24?img=3"}
              />
            </ul>
          </div>
        </nav>

        <footer className="border-t border-slate-200 p-2 mb-6">
          <SidebarItem
            className="w-full"
            itemName={"Disconnect"}
            dashIcon={<MdPower color="#000" />}
          />
        </footer>
      </aside>

      {/* <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      >Close</div> */}
      <Modal
        centered
        okText={"Post"}
        title={"Create new post"}
        open={isBasicModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <NewPostCard />
      </Modal>
    </>
  );
};

export const bisNeera = 12
export default LeftSidebar;
