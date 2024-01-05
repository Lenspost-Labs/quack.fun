import React from "react";
import NotificationCard from "../Cards/NotificationCard.tsx";

const NotificationsWrapper : React.FC<any> = () => {
  return (
    <>
      <NotificationCard
        userProfileImage={"https://picsum.photos/id/146/40/40"}
        userProfileUsername={"scriptscrypt"}
        userProfileName={"Scripts"}
        userNotifText=" Lorem ipsum dolor sit amet consectetur adipiscing elit "
        userNotifFor={"Replied to your comment"}
      />
    </>
  );
};

export default NotificationsWrapper;