import React from "react";
import NotificationCard from "../Cards/NotificationCard.tsx";

// @ts-ignore
import BsArrowLeft from "@meronex/icons/bs/BsArrowLeft";
import { Link } from "react-router-dom";

const NotificationsWrapper: React.FC<any> = () => {
  return (
    <>
      <div className="flex flex-col mt-2">
        <div className="flex m-2">
          <div className="mt-2">
            {" "}
            <Link to="/feed">
              {" "}
              <BsArrowLeft size={24} />{" "}
            </Link>{" "}
          </div>
          <div className="m-2">Notifications</div>
        </div>

        <NotificationCard
          userProfileImage={"https://picsum.photos/id/146/40/40"}
          userProfileUsername={"scriptscrypt"}
          userProfileName={"Scripts"}
          userNotifText=" Lorem ipsum dolor sit amet consectetur adipiscing elit "
          userNotifFor={"Replied to your comment"}
        />
      </div>
    </>
  );
};

export default NotificationsWrapper;
