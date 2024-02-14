import React, { useEffect } from "react";
import { useState } from "react";
// @ts-ignore
import BsHouse from "@meronex/icons/bs/BsHouse";
// @ts-ignore
import MdNotificationsOutline from "@meronex/icons/ios/MdNotificationsOutline";
// @ts-ignore
import MdCreate from "@meronex/icons/ios/MdCreate";
// ts-ignore
import AiOutlineUser from "@meronex/icons/ai/AiOutlineUser";

import { Link } from "react-router-dom";
import NewPostCard from "../../Components/Cards/NewPostCard.tsx";
// import ProfileCard from "../../Components/Cards/ProfileCard.tsx";
import SidebarItem from "../../Components/Items/SidebarItem.tsx";
import { Divider, Modal } from "antd";
import { useWallet } from "@solana/wallet-adapter-react";
import { SolLoginBtn } from "src/appCrust/Components/Items/SolLoginBtn.tsx";
import useUser from "src/hooks/userHooks/useUser.tsx";

const LeftSidebar: React.FC<any> = () => {
  const [isSideNavOpen] = useState(true);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const { userData, hasUserLoggedIn, setHasUserLoggedIn } = useUser();

  const { connected } = useWallet();
  console.log(connected);

  const showModal = () => {
    setIsBasicModalOpen(true);
  };
  const closeModal = () => {
    setIsBasicModalOpen(false);
  };

  const sidebarItems = [
    {
      to: "/feed",
      content: <div className="cursor-pointerm-4 flex">Logo</div>,
    },
    {
      to: "/feed",
      content: (
        <SidebarItem itemName="Home" dashIcon={<BsHouse color="#000" />} />
      ),
    },
    {
      to: "/notifications",
      content: (
        <SidebarItem
          itemName="Notifications"
          dashIcon={<MdNotificationsOutline color="#000" />}
        />
      ),
    },
    {
      to: `/${(userData as { fid?: string })?.fid}`,
      content: (
        <SidebarItem
          itemName="Profile"
          dashIcon={<AiOutlineUser color="#000" />}
        />
      ),
    },
  ];

  const fnCheckIfUserHasLoggedIn = () => {
    if (hasUserLoggedIn) {
      setHasUserLoggedIn(true);
    }

    if (!hasUserLoggedIn) {
      setHasUserLoggedIn(false);
    }
  };
  useEffect(() => {
    fnCheckIfUserHasLoggedIn;
  }, []);

  useEffect(() => {
    fnCheckIfUserHasLoggedIn;
  }, [hasUserLoggedIn]);

  useEffect(() => {
    fnCheckIfUserHasLoggedIn;
  }, [userData]);

  useEffect(() => {
    fnCheckIfUserHasLoggedIn;
  }, [connected]);

  return (
    <>
      <aside
        aria-label="Side navigation"
        className={`relative top-0 bottom-0 left-0 z-40 flex pr-2 h-96vh w-72 flex-col border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <nav aria-label="side navigation" className="flex-1 overflow-auto">
          {/* <ProfileCard /> */}
          <div>
            <ul className="flex flex-1 flex-col gap-0 py-3">
              {sidebarItems.map((item, index) => (
                <Link key={index} to={item.to}>
                  {item.content}
                </Link>
              ))}
              <div>
                <Divider className="m-4" />
                <SidebarItem
                  className="cursor-pointer mt-0 rounded-sm bg-yellow-200 text-slate-700 transition-colors hover:bg-yellow-50 hover:text-yellow-300 focus:bg-yellow-50 aria-[current=page]:bg-yellow-50 aria-[current=page]:text-yellow-500"
                  onClickFn={showModal}
                  itemName="Post"
                  dashIcon={<MdCreate color="#000" />}
                />
              </div>
              {/* </Link> */}
            </ul>
          </div>
        </nav>

        <SolLoginBtn />
      </aside>

      <Modal
        centered
        okText={"Post"}
        title={"Create new post"}
        open={isBasicModalOpen}
        onOk={closeModal}
        onCancel={closeModal}
        cancelButtonProps={{ type: "text" }}
        okButtonProps={{ color: "yellow", type: "default" }}
        footer={null}
      >
        <NewPostCard isInFeed={false} />
      </Modal>
    </>
  );
};

export default LeftSidebar;
