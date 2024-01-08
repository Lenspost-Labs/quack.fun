import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarItem from "../Items/SidebarItem";
// @ts-ignore
import BsHouse from "@meronex/icons/bs/BsHouse";
// @ts-ignore
import MdNotificationsOutline from "@meronex/icons/ios/MdNotificationsOutline";
// @ts-ignore
import MdCreate from "@meronex/icons/ios/MdCreate";
import { Modal } from "antd";
import NewPostCard from "../Cards/NewPostCard";

const BottomNavbar = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);

  const closeModal = () => {
    setIsBasicModalOpen(false);
  };

  return (
    <>
      {/* Mobile View Bottom Bar */}
      <div className="fixed bottom-0 z-50 w-full flex justify-between bg-white p-2 px-4 md:hidden overflow-x-scroll">
        <Link to="/feed">
          <SidebarItem
            itemName="Home"
            onClick
            dashIcon={<BsHouse color="#000" />}
          />
        </Link>

        {/* <Link to="/new"> */}

        <SidebarItem
          onClickFn={() => setIsBasicModalOpen(true)}
          itemName="New Post"
          dashIcon={<MdCreate color="#000" />}
        />
        {/* </Link> */}

        <Link to="/notifications">
          <SidebarItem
            itemName="Notifications"
            dashIcon={<MdNotificationsOutline color="#000" />}
          />
        </Link>

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
