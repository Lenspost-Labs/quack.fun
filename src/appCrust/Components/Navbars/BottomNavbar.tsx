import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarItem from "../Items/SidebarItem";
// @ts-ignore
import BsHouse from "@meronex/icons/bs/BsHouse";
// @ts-ignore
import BsHouseFill from "@meronex/icons/bs/BsHouseFill";
// @ts-ignore
import MdNotificationsOutline from "@meronex/icons/ios/MdNotificationsOutline";
// @ts-ignore
import MdNotifications from "@meronex/icons/ios/MdNotifications";
// @ts-ignore
import MdCreate from "@meronex/icons/ios/MdCreate";
import { Modal, Tooltip } from "antd";
import NewPostCard from "../Cards/NewPostCard";
import BsPerson from "@meronex/icons/bs/BsPerson";
import BsPersonFill from "@meronex/icons/bs/BsPersonFill";
import useUser from "src/hooks/userHooks/useUser";

const BottomNavbar = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const { pathname } = useLocation();
  const { userData } = useUser();

  console.log(pathname);
  const [stIsActive, setStIsActive] = useState(1);

  const closeModal = () => {
    setIsBasicModalOpen(false);
  };

  const sidebarItems = [
    {
      to: "/feed",
      // itemName: "Home",
      // dashIcon: <BsHouse color={stIsActive === 1 ? "#fef08a" : "#000"} />,
      dashIcon:
        stIsActive === 1 ? (
          <BsHouseFill color="#ffe000" />
        ) : (
          <BsHouse color="#000" />
        ),
    },
    {
      to: pathname, // To avoid re-routing on modal open
      onClickFn: () => {
        setIsBasicModalOpen(true);
      },
      // itemName: "New Post",
      dashIcon: <MdCreate color={stIsActive === 2 ? "#ffe000" : "#000"} />,
    },
    {
      to: "/notifications",
      // itemName: "Notifications",
      // dashIcon: (
      //   <MdNotificationsOutline color={stIsActive === 3 ? "#fef08a" : "#000"} />
      // ),
      dashIcon:
        stIsActive === 3 ? (
          <MdNotifications color="#ffe000" />
        ) : (
          <MdNotificationsOutline color="#000" />
        ),
    },
    {
      to: `${(userData as { fid?: string })?.fid}`,
      dashIcon:
        stIsActive === 4 ? (
          <BsPersonFill color="#ffe000" />
        ) : (
          <BsPerson color="#000" />
        ),
    },
  ];

  return (
    <>
      {/* Mobile View Bottom Bar */}
      <div className="fixed bottom-0 z-50 w-full flex justify-between border-t bg-white p-2 px-4 md:hidden overflow-x-scroll">
        {sidebarItems.map((item, index) => (
          <div onClick={() => setStIsActive(index + 1)} key={index}>
            {/* <Tooltip title={item.to.split("/")[1].toUpperCase()} placement="top"> */}
            <Link to={item.to || "/"}>
              <SidebarItem {...item} />
            </Link>
            {/* </Tooltip> */}
          </div>
        ))}

        <Modal
          centered
          okText={"Post"}
          title={"Create new post"}
          open={isBasicModalOpen}
          onOk={closeModal}
          onCancel={closeModal}
          footer={null}
        >
          <NewPostCard isInFeed={false} />
        </Modal>
      </div>
    </>
  );
};

export default BottomNavbar;
